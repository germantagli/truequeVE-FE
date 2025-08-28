import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';

interface OTPVerificationProps {
  email?: string;
  phone?: string;
  type: 'email' | 'phone';
  purpose: 'login' | 'register' | 'reset';
  onSuccess: () => void;
  onCancel?: () => void;
  showPasswordField?: boolean;
  password?: string;
  onPasswordChange?: (password: string) => void;
  additionalData?: Record<string, any>;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  phone,
  type,
  purpose,
  onSuccess,
  onCancel,
  showPasswordField = false,
  password = '',
  onPasswordChange,
  additionalData = {},
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState('');

  const { sendOTP, verifyOTP, login, register } = useAuth();

  // Contador regresivo para reenvío de OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOTP = async () => {
    if (!email && !phone) {
      setError('Email o teléfono requerido');
      return;
    }

    setIsSendingOTP(true);
    setError('');
    setSuccess('');

    try {
      const success = await sendOTP(email || '', phone || '', type, purpose);
      if (success) {
        setSuccess(`Código enviado a ${type === 'email' ? email : phone}`);
        setCountdown(120); // 2 minutos
      } else {
        setError('Error al enviar código OTP');
      }
    } catch (err: any) {
      // Mostrar el mensaje de error específico del backend
      setError(err.message || 'Error al enviar código OTP');
      
      // Si es un error de usuario no encontrado, sugerir registro
      if (purpose === 'login' && err.message?.includes('No existe una cuenta')) {
        setError(`${err.message}. ¿Quieres crear una nueva cuenta?`);
      }
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode.trim()) {
      setOtpError('Ingresa el código OTP');
      return;
    }

    if (otpCode.length !== 6) {
      setOtpError('El código debe tener 6 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');
    setOtpError('');

    try {
      // Verificar OTP
      const otpValid = await verifyOTP(email || '', phone || '', otpCode, purpose, type);
      
      if (!otpValid) {
        setOtpError('Código OTP inválido o expirado');
        return;
      }

      // Si es login, proceder con la autenticación
      if (purpose === 'login') {
        // El backend ya devolvió el token en la respuesta de verifyOTP
        // Necesitamos obtener la respuesta completa del backend
        try {
          const response = await authService.verifyOTP(email || '', phone || '', otpCode, purpose, type);
          
          if (response.success && response.token) {
            // Usar el token real del backend
            const loginSuccess = await login(response.token);
            
            if (loginSuccess) {
              onSuccess();
            } else {
              setError('Error al iniciar sesión');
            }
          } else {
            setError('Error al verificar OTP');
          }
        } catch (err: any) {
          setError(err.message || 'Error al verificar OTP');
        }
      }
      // Si es registro, proceder con el registro (sin contraseña)
      else if (purpose === 'register' && showPasswordField && additionalData.name) {
        const registerSuccess = await register({
          name: additionalData.name,
          email: email || '',
          phone: phone || '',
          otpCode,
          type,
        });

        if (registerSuccess) {
          onSuccess();
        } else {
          setError('Error al crear la cuenta');
        }
      }
      // Si solo es verificación OTP
      else {
        onSuccess();
      }
    } catch (err) {
      setError('Error al verificar código OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (countdown === 0) {
      handleSendOTP();
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Verificación {type === 'email' ? 'por Email' : 'por SMS'}
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
        Ingresa el código de 6 dígitos enviado a{' '}
        <strong>{type === 'email' ? email : phone}</strong>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Campo de contraseña (para login/register) */}
        {showPasswordField && purpose === 'login' && (
          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange?.(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* Campo OTP */}
        <TextField
          fullWidth
          label="Código OTP"
          value={otpCode}
          onChange={(e) => {
            setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
            setOtpError('');
          }}
          error={!!otpError}
          helperText={otpError}
          inputProps={{
            maxLength: 6,
            style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' },
          }}
          placeholder="000000"
        />

        {/* Botón de verificación */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleVerifyOTP}
          disabled={isLoading || otpCode.length !== 6}
          sx={{ py: 1.5 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Verificar Código'
          )}
        </Button>

        {/* Reenvío de OTP */}
        <Box sx={{ textAlign: 'center' }}>
          {countdown > 0 ? (
            <Typography variant="body2" color="text.secondary">
              Reenviar código en {formatCountdown(countdown)}
            </Typography>
          ) : (
            <Button
              variant="text"
              onClick={handleResendOTP}
              disabled={isSendingOTP}
              sx={{ textTransform: 'none' }}
            >
              {isSendingOTP ? (
                <CircularProgress size={16} />
              ) : (
                'Reenviar código'
              )}
            </Button>
          )}
        </Box>

        {/* Botón cancelar */}
        {onCancel && (
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default OTPVerification;
