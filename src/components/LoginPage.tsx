import React, { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, NotificationsNone } from '@mui/icons-material';

type LoginPageProps = {
  onLogin?: (identifier: string, password: string) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onLogin) {
      onLogin(identifier, password);
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.3 }}>
            TruequeYa
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button color="inherit">Inicio</Button>
            <Button color="inherit">Categorías</Button>
            <Button color="inherit">Publicar</Button>
            <Button color="inherit">Iniciar sesión</Button>
            <IconButton color="inherit" aria-label="Notificaciones">
              <NotificationsNone />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
        <Container maxWidth="sm">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Bienvenido de nuevo
            </Typography>

            <Card elevation={1} sx={{ width: '100%' }}>
              <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      placeholder="Correo electrónico o teléfono"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      type="text"
                      autoComplete="username"
                    />

                    <TextField
                      fullWidth
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
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

                    <Box textAlign="right">
                      <MuiLink href="#" underline="hover" variant="body2">
                        ¿Olvidaste tu contraseña?
                      </MuiLink>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 1,
                        bgcolor: '#00E676',
                        color: '#000',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: '#00c860',
                        },
                      }}
                    >
                      Iniciar sesión
                    </Button>
                  </Stack>
                </Box>

                <Box sx={{ my: 3 }}>
                  <Divider>O inicia sesión con</Divider>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ borderColor: 'grey.400', color: 'text.primary' }}
                  >
                    Continuar con Gmail
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ borderColor: 'grey.400', color: 'text.primary' }}
                  >
                    Continuar con Apple
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Typography variant="body2">
              ¿No tienes una cuenta?{' '}
              <MuiLink href="/register" underline="hover">
                Regístrate
              </MuiLink>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;