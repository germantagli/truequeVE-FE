import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

type LoginPageProps = {
  onLogin?: (data: { identifier: string; password: string }) => Promise<void> | void;
  onContinueWithGoogle?: () => Promise<void> | void;
  onContinueWithApple?: () => Promise<void> | void;
  redirectAfterLogin?: string;
};

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onContinueWithGoogle,
  onContinueWithApple,
  redirectAfterLogin = '/',
}) => {
  const [emailOrPhone, setEmailOrPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const defaultLogin = async (data: { identifier: string; password: string }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => 'Error de autenticación');
      throw new Error(text || 'Error de autenticación');
    }
    window.location.assign(redirectAfterLogin);
  };

  const defaultGoogle = () => {
    window.location.href = '/api/auth/google';
  };

  const defaultApple = () => {
    window.location.href = '/api/auth/apple';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const handler = onLogin ?? defaultLogin;
      await handler({ identifier: emailOrPhone.trim(), password });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo iniciar sesión.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            TruequeYa
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button color="inherit">Inicio</Button>
            <Button color="inherit">Categorías</Button>
            <Button color="inherit">Publicar</Button>
            <Button color="inherit">Iniciar sesión</Button>
            <IconButton color="inherit" aria-label="notificaciones">
              <NotificationsNoneIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 6 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          Bienvenido de nuevo
        </Typography>

        <Card elevation={2} sx={{ width: '100%' }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                {errorMessage && (
                  <Alert severity="error" variant="outlined">
                    {errorMessage}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  placeholder="Correo electrónico o teléfono"
                  variant="outlined"
                  name="identifier"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  autoComplete="username"
                />

                <TextField
                  fullWidth
                  placeholder="Contraseña"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link href="/forgot-password" underline="hover" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    bgcolor: '#00E676',
                    color: '#000',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#00c853' },
                    py: 1.2,
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Iniciando…' : 'Iniciar sesión'}
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }}>O inicia sesión con</Divider>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => (onContinueWithGoogle ?? defaultGoogle)()}
                sx={{
                  borderColor: '#BDBDBD',
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { borderColor: '#9E9E9E', backgroundColor: 'rgba(0,0,0,0.02)' },
                  py: 1.1,
                }}
              >
                Continuar con Gmail
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AppleIcon />}
                onClick={() => (onContinueWithApple ?? defaultApple)()}
                sx={{
                  borderColor: '#BDBDBD',
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { borderColor: '#9E9E9E', backgroundColor: 'rgba(0,0,0,0.02)' },
                  py: 1.1,
                }}
              >
                Continuar con Apple
              </Button>
            </Stack>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes una cuenta?{' '}
                <Link href="/register" underline="hover">
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;

