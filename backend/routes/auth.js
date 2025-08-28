import express from 'express';
import { body, validationResult } from 'express-validator';
import { 
  createUser, 
  findUser, 
  verifyPassword, 
  generateToken, 
  createSession, 
  deleteSession,
  verifySession,
  updateUser
} from '../services/authService.js';
import { verifyOTP } from '../services/otpService.js';
import { isValidEmail, isValidPhone } from '../services/notificationService.js';
import { getDatabase } from '../config/database.js';

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

// Middleware para verificar autenticación
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Token de acceso requerido'
      });
    }

    const user = await verifySession(token);
    if (!user) {
      return res.status(401).json({
        error: 'Token inválido o expirado'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Error en autenticación:', error);
    res.status(401).json({
      error: 'Error de autenticación'
    });
  }
};

// POST /api/auth/register - Registro con OTP (sin contraseña)
router.post('/register', [
  body('name').isLength({ min: 2 }).withMessage('Nombre debe tener al menos 2 caracteres'),
  body('email').optional().custom((value, { req }) => {
    if (req.body.type === 'email') {
      if (!value || !isValidEmail(value)) {
        throw new Error('Email inválido');
      }
    }
    return true;
  }),
  body('phone').optional().custom((value, { req }) => {
    if (req.body.type === 'phone') {
      if (!value || !isValidPhone(value)) {
        throw new Error('Teléfono inválido');
      }
    }
    return true;
  }),
  body('otpCode').isLength({ min: 6, max: 6 }).withMessage('OTP debe tener 6 dígitos'),
  body('type').isIn(['email', 'phone']).withMessage('Tipo debe ser email o phone'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { name, email, phone, otpCode, type } = req.body;

    // La validación ya se hizo en el middleware, no necesitamos validar de nuevo

    // Verificar OTP
    const otpResult = await verifyOTP(email, phone, otpCode, 'register');
    if (!otpResult.valid) {
      return res.status(400).json({
        error: 'OTP inválido',
        message: otpResult.message
      });
    }

    // Crear usuario (sin contraseña)
    const userData = {
      name,
      email,
      phone
    };

    const user = await createUser(userData);

    // Generar token
    const token = generateToken(user);

    // Crear sesión
    await createSession(user.id, token);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified
      },
      token
    });

  } catch (error) {
    console.error('❌ Error en /auth/register:', error);
    
    if (error.message.includes('ya existe')) {
      return res.status(409).json({
        error: 'Usuario ya existe',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'Error al registrar usuario',
      message: error.message
    });
  }
});

// POST /api/auth/login - Login con OTP (opcionalmente con contraseña)
router.post('/login', [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
  body('password').optional().isLength({ min: 6 }).withMessage('Contraseña debe tener al menos 6 caracteres'),
  body('otpCode').isLength({ min: 6, max: 6 }).withMessage('OTP debe tener 6 dígitos'),
  body('type').isIn(['email', 'phone']).withMessage('Tipo debe ser email o phone'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { email, phone, password, otpCode, type } = req.body;

    // Validar que se proporcione email o teléfono
    if (!email && !phone) {
      return res.status(400).json({
        error: 'Email o teléfono requerido'
      });
    }

    // Buscar usuario
    const user = await findUser(email, phone);
    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña (opcional)
    if (password) {
      const isPasswordValid = await verifyPassword(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Credenciales inválidas'
        });
      }
    } else if (user.password_hash) {
      // Si el usuario tiene contraseña pero no se proporcionó, requerir contraseña
      return res.status(400).json({
        error: 'Contraseña requerida para este usuario'
      });
    }

    // Verificar OTP
    const otpResult = await verifyOTP(email, phone, otpCode, 'login');
    if (!otpResult.valid) {
      return res.status(400).json({
        error: 'OTP inválido',
        message: otpResult.message
      });
    }

    // Generar token
    const token = generateToken(user);

    // Crear sesión
    await createSession(user.id, token);

    res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.is_verified
      },
      token
    });

  } catch (error) {
    console.error('❌ Error en /auth/login:', error);
    res.status(500).json({
      error: 'Error al iniciar sesión',
      message: error.message
    });
  }
});

// POST /api/auth/logout - Cerrar sesión
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    await deleteSession(token);

    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('❌ Error en /auth/logout:', error);
    res.status(500).json({
      error: 'Error al cerrar sesión',
      message: error.message
    });
  }
});

// GET /api/auth/me - Obtener información del usuario actual
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        isVerified: req.user.is_verified
      }
    });

  } catch (error) {
    console.error('❌ Error en /auth/me:', error);
    res.status(500).json({
      error: 'Error al obtener información del usuario',
      message: error.message
    });
  }
});

// PUT /api/auth/profile - Actualizar perfil
router.put('/profile', [
  authenticateToken,
  body('name').optional().isLength({ min: 2 }).withMessage('Nombre debe tener al menos 2 caracteres'),
  body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { name, phone } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: 'No hay datos para actualizar'
      });
    }

    const updatedUser = await updateUser(req.user.id, updateData);

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isVerified: updatedUser.is_verified
      }
    });

  } catch (error) {
    console.error('❌ Error en /auth/profile:', error);
    res.status(500).json({
      error: 'Error al actualizar perfil',
      message: error.message
    });
  }
});

// POST /api/auth/change-password - Cambiar contraseña
router.post('/change-password', [
  authenticateToken,
  body('currentPassword').isLength({ min: 6 }).withMessage('Contraseña actual debe tener al menos 6 caracteres'),
  body('newPassword').isLength({ min: 6 }).withMessage('Nueva contraseña debe tener al menos 6 caracteres'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Verificar contraseña actual
    const user = await findUser(req.user.email, req.user.phone);
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password_hash);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: 'Contraseña actual incorrecta'
      });
    }

    // Actualizar contraseña
    await updateUser(req.user.id, { password: newPassword });

    res.json({
      success: true,
      message: 'Contraseña cambiada exitosamente'
    });

  } catch (error) {
    console.error('❌ Error en /auth/change-password:', error);
    res.status(500).json({
      error: 'Error al cambiar contraseña',
      message: error.message
    });
  }
});

// POST /api/auth/clear-test-users - Limpiar usuarios de prueba (solo desarrollo)
router.post('/clear-test-users', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({
      error: 'Esta función solo está disponible en desarrollo'
    });
  }

  try {
    const db = getDatabase();
    
    // Primero, ver cuántos usuarios hay antes de limpiar
    const beforeCount = await db.get('SELECT COUNT(*) as count FROM users');
    console.log(`📊 Usuarios antes de limpiar: ${beforeCount.count}`);
    
    // Eliminar usuarios de prueba (más amplio)
    const result = await db.run('DELETE FROM users WHERE phone LIKE "+123456%" OR phone LIKE "+1672999%"');
    
    // Ver cuántos usuarios quedan después
    const afterCount = await db.get('SELECT COUNT(*) as count FROM users');
    console.log(`📊 Usuarios después de limpiar: ${afterCount.count}`);
    
    console.log(`🧹 ${result.changes} usuarios de prueba eliminados`);
    
    res.json({
      success: true,
      message: `${result.changes} usuarios de prueba eliminados (de ${beforeCount.count} a ${afterCount.count})`
    });
  } catch (error) {
    console.error('❌ Error al limpiar usuarios de prueba:', error);
    res.status(500).json({
      error: 'Error al limpiar usuarios de prueba',
      message: error.message
    });
  }
});

// GET /api/auth/debug-users - Ver todos los usuarios (solo desarrollo)
router.get('/debug-users', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({
      error: 'Esta función solo está disponible en desarrollo'
    });
  }

  try {
    const db = getDatabase();
    
    // Verificar si la tabla existe
    const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    console.log('🔍 Tabla users existe:', !!tableExists);
    
    if (!tableExists) {
      return res.json({
        success: true,
        count: 0,
        users: [],
        message: 'La tabla users no existe'
      });
    }
    
    // Verificar estructura de la tabla
    const tableInfo = await db.all("PRAGMA table_info(users)");
    console.log('🔍 Estructura de la tabla users:', tableInfo);
    
    // Obtener usuarios usando promesas para evitar el problema de Database {}
    const users = await new Promise((resolve, reject) => {
      db.all('SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
    
    console.log('📊 Usuarios en la base de datos:', users);
    
    res.json({
      success: true,
      count: users.length,
      users: users,
      tableExists: !!tableExists,
      tableStructure: tableInfo
    });
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({
      error: 'Error al obtener usuarios',
      message: error.message
    });
  }
});

// POST /api/auth/test-insert - Insertar usuario de prueba (solo desarrollo)
router.post('/test-insert', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({
      error: 'Esta función solo está disponible en desarrollo'
    });
  }

  try {
    const db = getDatabase();
    const { name, email, phone } = req.body;
    
    console.log('🧪 Insertando usuario de prueba:', { name, email, phone });
    
    // Verificar si el usuario ya existe
    const existingUser = await new Promise((resolve, reject) => {
      db.get(
        'SELECT id, email, phone FROM users WHERE email = ? OR phone = ?',
        [email || null, phone || null],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
    
    if (existingUser) {
      return res.status(409).json({
        error: 'Usuario ya existe',
        message: 'Ya existe un usuario con este email o teléfono',
        existingUser: existingUser
      });
    }
    
    // Insertar usuario directamente
    const result = await db.run(
      `INSERT INTO users (email, phone, name, is_verified) VALUES (?, ?, ?, ?)`,
      [email || null, phone || null, name, 1]
    );
    
    console.log('✅ Usuario de prueba insertado con ID:', result.lastID);
    
    // Verificar que se insertó correctamente usando promesas
    const insertedUser = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [result.lastID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    
    res.json({
      success: true,
      message: 'Usuario de prueba insertado',
      user: insertedUser
    });
  } catch (error) {
    console.error('❌ Error al insertar usuario de prueba:', error);
    res.status(500).json({
      error: 'Error al insertar usuario de prueba',
      message: error.message
    });
  }
});

export default router;
