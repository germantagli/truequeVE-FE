import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendOTP, verifyOTP, canRequestOTP, clearTestOTPs } from '../services/otpService.js';
import { isValidEmail, isValidPhone } from '../services/notificationService.js';
import { findUser, generateToken, createSession } from '../services/authService.js';

const router = express.Router();

// Middleware para validar errores
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: errors.array()
    });
  }
  next();
};

// POST /api/otp/send - Enviar OTP
router.post('/send', [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
  body('type').isIn(['email', 'phone']).withMessage('Tipo debe ser email o phone'),
  body('purpose').isIn(['login', 'register', 'reset']).withMessage('Propósito inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { email, phone, type, purpose } = req.body;

    // Validar que se proporcione email o teléfono según el tipo
    if (type === 'email' && !email) {
      return res.status(400).json({
        error: 'Email requerido para envío por email'
      });
    }

    if (type === 'phone' && !phone) {
      return res.status(400).json({
        error: 'Teléfono requerido para envío por SMS'
      });
    }

    // Validar formato de email o teléfono
    if (type === 'email' && !isValidEmail(email)) {
      return res.status(400).json({
        error: 'Formato de email inválido'
      });
    }

    if (type === 'phone' && !isValidPhone(phone)) {
      return res.status(400).json({
        error: 'Formato de teléfono inválido'
      });
    }

    // Para login, verificar que el usuario existe
    if (purpose === 'login') {
      const user = await findUser(email, phone);
      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'No existe una cuenta con este email o teléfono'
        });
      }
    }

    // Verificar si puede solicitar OTP
    const canRequest = await canRequestOTP(email, phone, type, purpose);
    if (!canRequest.canRequest) {
      return res.status(429).json({
        error: 'Demasiadas solicitudes',
        message: canRequest.message,
        remainingTime: canRequest.remainingTime
      });
    }

    // Enviar OTP
    const result = await sendOTP(email, phone, type, purpose);

    res.json({
      success: true,
      message: result.message,
      expiresIn: result.expiresIn
    });

  } catch (error) {
    console.error('❌ Error en /otp/send:', error);
    res.status(500).json({
      error: 'Error al enviar OTP',
      message: error.message
    });
  }
});

// POST /api/otp/verify - Verificar OTP
router.post('/verify', [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
  body('otpCode').isLength({ min: 6, max: 6 }).withMessage('OTP debe tener 6 dígitos'),
  body('purpose').isIn(['login', 'register', 'reset']).withMessage('Propósito inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { email, phone, otpCode, purpose } = req.body;

    // Validar que se proporcione email o teléfono
    if (!email && !phone) {
      return res.status(400).json({
        error: 'Email o teléfono requerido'
      });
    }

    // Verificar OTP
    const result = await verifyOTP(email, phone, otpCode, purpose);

    if (!result.valid) {
      return res.status(400).json({
        error: 'OTP inválido',
        message: result.message
      });
    }

    // Si es login, generar token y crear sesión
    if (purpose === 'login') {
      console.log('🔍 Iniciando proceso de login...');
      
      // Buscar usuario
      const user = await findUser(email, phone);
      console.log('🔍 Usuario encontrado para login:', user);
      
      if (!user) {
        console.log('❌ Usuario no encontrado para login');
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'No existe una cuenta con este email o teléfono'
        });
      }

      console.log('🔍 Generando token para usuario:', {
        id: user.id,
        name: user.name,
        email: user.email
      });

      // Generar token
      const token = generateToken(user);
      console.log('🔍 Token generado:', token.substring(0, 20) + '...');

      console.log('🔍 Creando sesión con userId:', user.id);
      // Crear sesión
      await createSession(user.id, token);

      console.log('✅ Login exitoso, enviando respuesta');
      res.json({
        success: true,
        message: result.message,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isVerified: user.isVerified
        }
      });
    } else {
      // Para otros propósitos, solo devolver éxito
      res.json({
        success: true,
        message: result.message,
        otpId: result.otpId
      });
    }

  } catch (error) {
    console.error('❌ Error en /otp/verify:', error);
    res.status(500).json({
      error: 'Error al verificar OTP',
      message: error.message
    });
  }
});

// GET /api/otp/status - Verificar estado de OTP
router.get('/status', [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
  body('type').isIn(['email', 'phone']).withMessage('Tipo debe ser email o phone'),
  body('purpose').isIn(['login', 'register', 'reset']).withMessage('Propósito inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { email, phone, type, purpose } = req.query;

    // Validar que se proporcione email o teléfono según el tipo
    if (type === 'email' && !email) {
      return res.status(400).json({
        error: 'Email requerido para verificar estado'
      });
    }

    if (type === 'phone' && !phone) {
      return res.status(400).json({
        error: 'Teléfono requerido para verificar estado'
      });
    }

    // Verificar si puede solicitar OTP
    const canRequest = await canRequestOTP(email, phone, type, purpose);

    res.json({
      canRequest: canRequest.canRequest,
      message: canRequest.message,
      remainingTime: canRequest.remainingTime
    });

  } catch (error) {
    console.error('❌ Error en /otp/status:', error);
    res.status(500).json({
      error: 'Error al verificar estado de OTP',
      message: error.message
    });
  }
});

// POST /api/otp/clear-test - Limpiar OTPs de prueba (solo para desarrollo)
router.post('/clear-test', [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Solo permitir en desarrollo
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        error: 'Función no disponible en producción'
      });
    }

    await clearTestOTPs(email, phone);

    res.json({
      success: true,
      message: 'OTPs de prueba eliminados'
    });

  } catch (error) {
    console.error('❌ Error en /otp/clear-test:', error);
    res.status(500).json({
      error: 'Error al limpiar OTPs de prueba',
      message: error.message
    });
  }
});

export default router;
