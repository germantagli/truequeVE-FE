// Tipos de datos para autenticación
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn: string;
}

export interface OTPVerificationResponse {
  success: boolean;
  message: string;
  otpId?: number;
  token?: string;
  user?: User;
}
