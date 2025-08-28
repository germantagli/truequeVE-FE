import { getDatabase } from '../config/database.js';
import { sendEmailOTP, sendSMSOTP } from './notificationService.js';

// Generar OTP de 6 dígitos
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Crear OTP en la base de datos
export async function createOTP(email, phone, type, purpose) {
  const db = getDatabase();
  const otpCode = generateOTP();
  
  // Expira en 5 minutos
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
  try {
    // Validar que se proporcione email o teléfono según el tipo
    if (type === 'email' && !email) {
      throw new Error('Email requerido para OTP por email');
    }
    if (type === 'phone' && !phone) {
      throw new Error('Teléfono requerido para OTP por SMS');
    }

    // Invalidar OTPs anteriores para el mismo email/teléfono y propósito
    await db.run(
      'UPDATE otps SET is_used = 1 WHERE (email = ? OR phone = ?) AND purpose = ? AND is_used = 0',
      [email || null, phone || null, purpose]
    );

    // Insertar nuevo OTP
    const insertValues = [email || null, phone || null, otpCode, type, purpose, expiresAt.toISOString()];
    console.log('🔧 Valores a insertar en OTP:', {
      email: email || null,
      phone: phone || null,
      otpCode,
      type,
      purpose,
      expiresAt: expiresAt.toISOString()
    });
    
    const result = await db.run(
      `INSERT INTO otps (email, phone, otp_code, type, purpose, expires_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      insertValues
    );

    console.log(`📱 OTP creado para ${type === 'email' ? email : phone} (${purpose})`);

    return {
      id: result.lastID,
      otpCode,
      expiresAt
    };
  } catch (error) {
    console.error('❌ Error al crear OTP:', error);
    throw new Error('Error al generar OTP');
  }
}

// Enviar OTP
export async function sendOTP(email, phone, type, purpose) {
  try {
    // Crear OTP en la base de datos
    const { otpCode } = await createOTP(email, phone, type, purpose);

    // Enviar OTP según el tipo
    if (type === 'email') {
      await sendEmailOTP(email, otpCode, purpose);
    } else if (type === 'phone') {
      await sendSMSOTP(phone, otpCode, purpose);
    }

    return {
      success: true,
      message: `OTP enviado a ${type === 'email' ? email : phone}`,
      expiresIn: '5 minutos'
    };
  } catch (error) {
    console.error('❌ Error al enviar OTP:', error);
    throw new Error(`Error al enviar OTP: ${error.message}`);
  }
}

// Verificar OTP
export async function verifyOTP(email, phone, otpCode, purpose) {
  const db = getDatabase();
  
  try {
    // Buscar OTP válido
    const otp = await db.get(
      `SELECT * FROM otps 
       WHERE (email = ? OR phone = ?) 
       AND otp_code = ? 
       AND purpose = ? 
       AND is_used = 0 
       AND expires_at > datetime('now')
       ORDER BY created_at DESC 
       LIMIT 1`,
      [email || null, phone || null, otpCode, purpose]
    );

    if (!otp) {
      return {
        valid: false,
        message: 'OTP inválido, expirado o ya utilizado'
      };
    }

    // Marcar OTP como usado
    await db.run(
      'UPDATE otps SET is_used = 1, used_at = datetime("now") WHERE id = ?',
      [otp.id]
    );

    console.log(`✅ OTP verificado para ${email || phone} (${purpose})`);

    return {
      valid: true,
      message: 'OTP verificado correctamente',
      otpId: otp.id
    };
  } catch (error) {
    console.error('❌ Error al verificar OTP:', error);
    throw new Error('Error al verificar OTP');
  }
}

// Limpiar OTPs expirados (ejecutar periódicamente)
export async function cleanupExpiredOTPs() {
  const db = getDatabase();
  
  try {
    const result = await db.run(
      'DELETE FROM otps WHERE expires_at < datetime("now") AND is_used = 0'
    );
    
    if (result.changes > 0) {
      console.log(`🧹 ${result.changes} OTPs expirados eliminados`);
    }
  } catch (error) {
    console.error('❌ Error al limpiar OTPs expirados:', error);
  }
}

// Función de utilidad para limpiar OTPs de prueba (solo para desarrollo)
export async function clearTestOTPs(email, phone) {
  const db = getDatabase();
  
  try {
    const result = await db.run(
      'DELETE FROM otps WHERE (email = ? OR phone = ?)',
      [email, phone]
    );
    
    if (result.changes > 0) {
      console.log(`🧹 ${result.changes} OTPs de prueba eliminados para ${email || phone}`);
    }
  } catch (error) {
    console.error('❌ Error al limpiar OTPs de prueba:', error);
  }
}

// Verificar si un usuario puede solicitar un nuevo OTP
export async function canRequestOTP(email, phone, type, purpose) {
  const db = getDatabase();
  
  try {
    // Buscar OTPs recientes (últimos 2 minutos)
    const recentOTP = await db.get(
      `SELECT strftime('%Y-%m-%d %H:%M:%S', created_at) as created_at FROM otps 
       WHERE (email = ? OR phone = ?) 
       AND type = ? 
       AND purpose = ? 
       AND created_at > datetime('now', '-2 minutes')
       ORDER BY created_at DESC 
       LIMIT 1`,
      [email, phone, type, purpose]
    );

    console.log('🔍 OTP reciente encontrado:', recentOTP);

    if (recentOTP && recentOTP.created_at) {
      console.log('📅 created_at value:', recentOTP.created_at);
      
      // Validar que created_at sea una fecha válida
      const createdDate = new Date(recentOTP.created_at);
      if (isNaN(createdDate.getTime())) {
        console.error('❌ Fecha inválida en created_at:', recentOTP.created_at);
        return {
          canRequest: true,
          message: 'Puede solicitar OTP'
        };
      }

      const createdTime = createdDate.getTime();
      const currentTime = Date.now();
      const timeDiff = currentTime - createdTime;
      const cooldownPeriod = 2 * 60 * 1000; // 2 minutos en milisegundos
      const remainingTime = Math.max(0, Math.ceil((cooldownPeriod - timeDiff) / 1000));
      
      console.log('⏰ Cálculo de tiempo:', {
        createdTime,
        currentTime,
        timeDiff,
        cooldownPeriod,
        remainingTime
      });
      
      // Si el tiempo restante es 0 o negativo, permitir solicitar
      if (remainingTime <= 0) {
        return {
          canRequest: true,
          message: 'Puede solicitar OTP'
        };
      }
      
      return {
        canRequest: false,
        message: `Debes esperar ${remainingTime} segundos antes de solicitar otro OTP`,
        remainingTime
      };
    }

    return {
      canRequest: true,
      message: 'Puede solicitar OTP'
    };
  } catch (error) {
    console.error('❌ Error al verificar si puede solicitar OTP:', error);
    throw new Error('Error al verificar límites de OTP');
  }
}
