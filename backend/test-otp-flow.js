/**
 * Script de prueba para verificar el flujo de OTP
 * Prueba la verificación de usuario existente antes de enviar OTP para login
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Función para limpiar la consola
const clearConsole = () => {
  console.clear();
  console.log('🧪 PRUEBAS DE FLUJO OTP\n');
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

// Prueba 1: Intentar enviar OTP para login con usuario que NO existe
const testLoginWithNonExistentUser = async () => {
  console.log('📧 Prueba 1: Login con usuario que NO existe');
  
  const result = await makeRequest('POST', '/otp/send', {
    email: 'usuario-inexistente@test.com',
    type: 'email',
    purpose: 'login'
  });

  if (!result.success) {
    console.log('✅ Error esperado:', result.error.message);
    console.log('   Status:', result.status);
  } else {
    console.log('❌ Error: Debería haber fallado');
  }
  console.log('');
};

// Prueba 2: Intentar enviar OTP para login con usuario que SÍ existe
const testLoginWithExistentUser = async () => {
  console.log('📧 Prueba 2: Login con usuario que SÍ existe');
  
  const result = await makeRequest('POST', '/otp/send', {
    email: 'test@example.com', // Usuario que debería existir
    type: 'email',
    purpose: 'login'
  });

  if (result.success) {
    console.log('✅ OTP enviado exitosamente');
    console.log('   Mensaje:', result.data.message);
  } else {
    console.log('❌ Error inesperado:', result.error.message);
    console.log('   Status:', result.status);
  }
  console.log('');
};

// Prueba 3: Enviar OTP para registro (debería funcionar sin verificar usuario)
const testRegisterOTP = async () => {
  console.log('📧 Prueba 3: OTP para registro (nuevo usuario)');
  
  const result = await makeRequest('POST', '/otp/send', {
    email: 'nuevo-usuario@test.com',
    type: 'email',
    purpose: 'register'
  });

  if (result.success) {
    console.log('✅ OTP enviado exitosamente para registro');
    console.log('   Mensaje:', result.data.message);
  } else {
    console.log('❌ Error inesperado:', result.error.message);
    console.log('   Status:', result.status);
  }
  console.log('');
};

// Prueba 4: Rate limiting
const testRateLimiting = async () => {
  console.log('📧 Prueba 4: Rate limiting');
  
  // Intentar enviar múltiples OTPs rápidamente
  const promises = [];
  for (let i = 0; i < 3; i++) {
    promises.push(makeRequest('POST', '/otp/send', {
      email: 'test-rate-limit@example.com',
      type: 'email',
      purpose: 'login'
    }));
  }

  const results = await Promise.all(promises);
  
  results.forEach((result, index) => {
    if (!result.success && result.status === 429) {
      console.log(`✅ Rate limiting funcionando (intento ${index + 1})`);
      console.log('   Mensaje:', result.error.message);
    } else if (result.success) {
      console.log(`⚠️  OTP enviado (intento ${index + 1})`);
    } else {
      console.log(`❌ Error inesperado (intento ${index + 1}):`, result.error.message);
    }
  });
  console.log('');
};

// Función principal
const runTests = async () => {
  clearConsole();
  
  console.log('🚀 Iniciando pruebas de flujo OTP...\n');
  
  await testLoginWithNonExistentUser();
  await testLoginWithExistentUser();
  await testRegisterOTP();
  await testRateLimiting();
  
  console.log('✅ Pruebas completadas');
};

// Ejecutar pruebas
runTests().catch(console.error);
