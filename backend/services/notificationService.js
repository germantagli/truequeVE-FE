import nodemailer from 'nodemailer';

// Configurar transporter de email (para desarrollo)
const createTransporter = () => {
  // En desarrollo, usar Ethereal Email para pruebas
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER || 'test@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'test123'
      }
    });
  }

  // En producción, usar configuración real
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Enviar OTP por email
export async function sendEmailOTP(email, otpCode, purpose) {
  try {
    // En desarrollo, simular envío de email
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Simulando envío de email en desarrollo...');
      console.log(`📧 Email: ${email}`);
      console.log(`📧 OTP: ${otpCode}`);
      console.log(`📧 Propósito: ${purpose}`);
      console.log('📧 Mensaje: Tu código de verificación TruequeVE es: ' + otpCode + '. Expira en 5 minutos.');
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    }

    // En producción, usar configuración real de email
    const transporter = createTransporter();
    
    const purposeText = {
      login: 'iniciar sesión',
      register: 'registrarse',
      reset: 'restablecer contraseña'
    };

    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@truequeve.com',
      to: email,
      subject: `Código de verificación TruequeVE - ${otpCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">TruequeVE</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; text-align: center;">Código de Verificación</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Has solicitado un código de verificación para <strong>${purposeText[purpose]}</strong> en TruequeVE.
            </p>
            
            <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 30px 0;">
              <h1 style="color: #667eea; font-size: 48px; margin: 0; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otpCode}
              </h1>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center;">
              Este código expira en <strong>5 minutos</strong> y solo puede ser usado una vez.
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>⚠️ Seguridad:</strong> Nunca compartas este código con nadie. TruequeVE nunca te pedirá este código por teléfono o email.
              </p>
            </div>
            
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              Si no solicitaste este código, puedes ignorar este email.
            </p>
          </div>
          
          <div style="background: #333; padding: 20px; text-align: center;">
            <p style="color: #999; margin: 0; font-size: 12px;">
              © 2024 TruequeVE. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email enviado a:', email);
    return true;
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    throw new Error('Error al enviar email');
  }
}

// Enviar OTP por SMS (simulado)
export async function sendSMSOTP(phone, otpCode, purpose) {
  try {
    // En desarrollo, simular envío de SMS
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 Simulando envío de SMS...');
      console.log(`📱 Número: ${phone}`);
      console.log(`📱 OTP: ${otpCode}`);
      console.log(`📱 Propósito: ${purpose}`);
      console.log('📱 Mensaje: Tu código de verificación TruequeVE es: ' + otpCode + '. Expira en 5 minutos.');
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    }

    // En producción, integrar con servicio de SMS real
    // Ejemplo con Twilio:
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    await client.messages.create({
      body: `Tu código de verificación TruequeVE es: ${otpCode}. Expira en 5 minutos.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    */

    console.log('📱 SMS enviado a:', phone);
    return true;
  } catch (error) {
    console.error('❌ Error al enviar SMS:', error);
    
    // En desarrollo, simular envío exitoso
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 Simulando envío de SMS en desarrollo...');
      return true;
    }
    
    throw new Error('Error al enviar SMS');
  }
}

// Verificar si es un email válido
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Verificar si es un teléfono válido
export function isValidPhone(phone) {
  // Aceptar formatos: +1234567890, 1234567890, (123) 456-7890
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}
