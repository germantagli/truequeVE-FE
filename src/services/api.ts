import axios from 'axios';
import type { User, AuthResponse, OTPResponse, OTPVerificationResponse } from '../types/auth';

// Re-export types for backward compatibility
export type { User, AuthResponse, OTPResponse, OTPVerificationResponse };

// Configuración base de axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  // Enviar OTP
  sendOTP: async (email: string, phone: string, type: 'email' | 'phone', purpose: 'login' | 'register' | 'reset'): Promise<OTPResponse> => {
    const payload: any = {
      type,
      purpose,
    };
    
    // Solo incluir email o phone según el tipo
    if (type === 'email') {
      payload.email = email;
    } else {
      payload.phone = phone;
    }
    
    try {
      const response = await api.post('/otp/send', payload);
      return response.data;
    } catch (error: any) {
      // Manejar error específico de usuario no encontrado
      if (error.response?.status === 404) {
        throw new Error(error.response.data.message || 'No existe una cuenta con este email o teléfono');
      }
      // Manejar error de rate limiting
      if (error.response?.status === 429) {
        throw new Error(error.response.data.message || 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.');
      }
      throw error;
    }
  },

  // Verificar OTP
  verifyOTP: async (email: string, phone: string, otpCode: string, purpose: 'login' | 'register' | 'reset', type?: 'email' | 'phone'): Promise<OTPVerificationResponse> => {
    const payload: any = {
      otpCode,
      purpose,
    };
    
    // Solo incluir email o phone según el tipo
    if (type === 'email' && email) {
      payload.email = email;
    } else if (type === 'phone' && phone) {
      payload.phone = phone;
    } else if (email) {
      payload.email = email;
    } else if (phone) {
      payload.phone = phone;
    }
    
    try {
      const response = await api.post('/otp/verify', payload);
      return response.data;
    } catch (error: any) {
      // Manejar errores específicos
      if (error.response?.status === 404) {
        throw new Error(error.response.data.message || 'Usuario no encontrado');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'OTP inválido');
      }
      throw error;
    }
  },

  // Registrar usuario
  register: async (userData: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    otpCode: string;
    type: 'email' | 'phone';
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Iniciar sesión
  login: async (credentials: {
    email?: string;
    phone?: string;
    password?: string;
    otpCode: string;
    type: 'email' | 'phone';
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Cerrar sesión
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Obtener información del usuario actual
  getCurrentUser: async (): Promise<{ success: boolean; user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Actualizar perfil
  updateProfile: async (profileData: {
    name?: string;
    phone?: string;
  }): Promise<{ success: boolean; message: string; user: User }> => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // Cambiar contraseña
  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  },


};

// Verificar salud del servidor
export const healthCheck = async (): Promise<{ status: string; timestamp: string; message: string }> => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
