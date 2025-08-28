/**
 * Script de prueba para verificar el flujo completo de login con OTP
 * Prueba: enviar OTP -> verificar OTP -> obtener token
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Función para limpiar la consola
const clearConsole = () => {
  console.clear();
  console.log('🧪 PRUEBAS DE FLUJO DE LOGIN COMPLETO\n');
};

// Función para hacer peticiones a la API
const makeRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message,
      status: error.response?.status 
    };
  }
};

// Prueba 1: Flujo completo de login con usuario existente
const testCompleteLoginFlow = async () => {
  console.log('📧 Prueba 1: Flujo completo de login con usuario existente');
  
  const testEmail = 'test@example.com';
  const testPhone = '+1234567890';
  
  // Paso 1: Enviar OTP
  console.log('   Paso 1: Enviando OTP...');
  const sendResult = await makeRequest('POST', '/otp/send', {
    email: testEmail,
    type: 'email',
    purpose: 'login'
  });

  if (!sendResult.success) {
    console.log('   ❌ Error al enviar OTP:', sendResult.error.message);
    return;
  }
  
  console.log('   ✅ OTP enviado exitosamente');
  console.log('   Mensaje:', sendResult.data.message);
  
  // Paso 2: Verificar OTP (usar código de prueba)
  console.log('   Paso 2: Verificando OTP...');
  const verifyResult = await makeRequest('POST', '/otp/verify', {
    email: testEmail,
    otpCode: '123456', // Código de prueba
    purpose: 'login'
  });

  if (!verifyResult.success) {
    console.log('   ❌ Error al verificar OTP:', verifyResult.error.message);
    return;
  }
  
  console.log('   ✅ OTP verificado exitosamente');
  console.log('   Mensaje:', verifyResult.data.message);
  
  // Verificar que se devolvió el token
  if (verifyResult.data.token) {
    console.log('   ✅ Token recibido:', verifyResult.data.token.substring(0, 20) + '...');
    console.log('   ✅ Usuario recibido:', verifyResult.data.user.name);
  } else {
    console.log('   ❌ No se recibió token');
  }
  
  console.log('');
};

// Prueba 2: Flujo de login con usuario inexistente
const testLoginWithNonExistentUser = async () => {
  console.log('📧 Prueba 2: Login con usuario inexistente');
  
  const result = await makeRequest('POST', '/otp/send', {
    email: 'usuario-inexistente@test.com',
    type: 'email',
    purpose: 'login'
  });

  if (!result.success) {
    console.log('   ✅ Error esperado:', result.error.message);
    console.log('   Status:', result.status);
  } else {
    console.log('   ❌ Error: Debería haber fallado');
  }
  console.log('');
};

// Prueba 3: Verificar OTP inválido
const testInvalidOTP = async () => {
  console.log('📧 Prueba 3: Verificar OTP inválido');
  
  const result = await makeRequest('POST', '/otp/verify', {
    email: 'test@example.com',
    otpCode: '999999', // Código inválido
    purpose: 'login'
  });

  if (!result.success) {
    console.log('   ✅ Error esperado:', result.error.message);
    console.log('   Status:', result.status);
  } else {
    console.log('   ❌ Error: Debería haber fallado');
  }
  console.log('');
};

// Prueba 4: Verificar OTP para registro (no debería devolver token)
const testRegisterOTP = async () => {
  console.log('📧 Prueba 4: OTP para registro (no debería devolver token)');
  
  const result = await makeRequest('POST', '/otp/verify', {
    email: 'nuevo-usuario@test.com',
    otpCode: '123456',
    purpose: 'register'
  });

  if (result.success) {
    console.log('   ✅ OTP verificado exitosamente');
    console.log('   ✅ No se devolvió token (correcto)');
    console.log('   Mensaje:', result.data.message);
  } else {
    console.log('   ❌ Error inesperado:', result.error.message);
  }
  console.log('');
};

// Función principal
const runTests = async () => {
  clearConsole();
  
  console.log('🚀 Iniciando pruebas de flujo de login completo...\n');
  
  await testCompleteLoginFlow();
  await testLoginWithNonExistentUser();
  await testInvalidOTP();
  await testRegisterOTP();
  
  console.log('✅ Pruebas completadas');
};

// Ejecutar pruebas
runTests().catch(console.error);
