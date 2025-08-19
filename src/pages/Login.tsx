import React, { useState } from 'react'
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
	Link,
	Stack,
	TextField,
	Toolbar,
	Typography,
	useTheme,
	Alert,
	CircularProgress,
	Snackbar,
	useMediaQuery,
} from '@mui/material'
import {
	Visibility,
	VisibilityOff,
	Notifications as NotificationsIcon,
	Home as HomeIcon,
	Category as CategoryIcon,
	Add as AddIcon,
	Login as LoginIcon,
} from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const theme = useTheme()
	const navigate = useNavigate()
	const { login } = useAuth()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const validateForm = () => {
		let isValid = true
		setEmailError('')
		setPasswordError('')

		// Validar email
		if (!email.trim()) {
			setEmailError('El correo electrónico es requerido')
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError('Ingresa un correo electrónico válido')
			isValid = false
		}

		// Validar contraseña
		if (!password.trim()) {
			setPasswordError('La contraseña es requerida')
			isValid = false
		} else if (password.length < 6) {
			setPasswordError('La contraseña debe tener al menos 6 caracteres')
			isValid = false
		}

		return isValid
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setError('')

		if (!validateForm()) {
			return
		}

		setIsLoading(true)

		try {
			const success = await login(email, password)
			
			if (success) {
				// Redirigir al dashboard o página principal
				navigate('/')
			} else {
				setError('Credenciales incorrectas. Usa test@example.com / 123456 para demo')
			}
		} catch (err) {
			setError('Error al iniciar sesión. Intenta nuevamente.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleSocialLogin = (provider: 'gmail' | 'apple') => {
		setIsLoading(true)
		// Simular login social
		setTimeout(() => {
			setIsLoading(false)
			setError(`Login con ${provider} no implementado en esta demo`)
		}, 1000)
	}

	const handleForgotPassword = () => {
		setError('Función de recuperación de contraseña no implementada en esta demo')
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Toolbar>
					<Typography 
						variant="h6" 
						sx={{ fontWeight: 700, color: 'primary.main', flexGrow: 1, cursor: 'pointer' }}
						onClick={() => navigate('/')}
					>
						TruequeYa
					</Typography>

					{/* Desktop Navigation */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
						<Button 
							startIcon={<HomeIcon />} 
							color="inherit"
							onClick={() => navigate('/')}
						>
							Inicio
						</Button>
						<Button startIcon={<CategoryIcon />} color="inherit">
							Categorías
						</Button>
						<Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: 'primary.main' }}>
							Publicar
						</Button>
						<Button 
							variant="outlined" 
							startIcon={<LoginIcon />}
							sx={{ 
								bgcolor: 'grey.100',
								borderColor: 'grey.300',
								'&:hover': {
									bgcolor: 'grey.200',
								}
							}}
						>
							Iniciar sesión
						</Button>
						<IconButton color="inherit">
							<NotificationsIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Main Content - Ocupa todo el espacio restante */}
			<Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 3, md: 4 } }}>
				<Container 
					maxWidth="sm" 
					sx={{ 
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: { xs: 'calc(100vh - 120px)', md: 'auto' }
					}}
				>
					{/* Welcome Text */}
					<Typography 
						variant={isMobile ? "h4" : "h3"}
						component="h1" 
						sx={{ 
							fontWeight: 700, 
							mb: { xs: 3, md: 4 }, 
							textAlign: 'center',
							color: 'text.primary',
							px: { xs: 1, sm: 0 }
						}}
					>
						Bienvenido de nuevo
					</Typography>

					{/* Login Form Card */}
					<Card 
						sx={{ 
							width: '100%', 
							maxWidth: { xs: '100%', sm: 450, md: 500 }, 
							p: { xs: 3, sm: 4, md: 5 }, 
							boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
							borderRadius: { xs: 2, md: 3 }
						}}
					>
						<CardContent sx={{ p: 0 }}>
							<form onSubmit={handleSubmit}>
								<Stack spacing={{ xs: 2.5, md: 3 }}>
									{/* Email/Phone Field */}
									<TextField
										fullWidth
										placeholder="Correo electrónico o teléfono"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value)
											setEmailError('')
										}}
										variant="outlined"
										error={!!emailError}
										helperText={emailError}
										disabled={isLoading}
										size={isMobile ? "medium" : "medium"}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: emailError ? 'error.main' : 'grey.300',
												},
												'&:hover fieldset': {
													borderColor: emailError ? 'error.main' : 'grey.400',
												},
											},
										}}
									/>

									{/* Password Field */}
									<TextField
										fullWidth
										placeholder="Contraseña"
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => {
											setPassword(e.target.value)
											setPasswordError('')
										}}
										variant="outlined"
										error={!!passwordError}
										helperText={passwordError}
										disabled={isLoading}
										size={isMobile ? "medium" : "medium"}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleTogglePasswordVisibility}
														edge="end"
														disabled={isLoading}
														sx={{ color: 'grey.500' }}
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: passwordError ? 'error.main' : 'grey.300',
												},
												'&:hover fieldset': {
													borderColor: passwordError ? 'error.main' : 'grey.400',
												},
											},
										}}
									/>

									{/* Forgot Password Link */}
									<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
										<Link
											component="button"
											variant="body2"
											onClick={handleForgotPassword}
											disabled={isLoading}
											sx={{
												color: 'grey.600',
												textDecoration: 'none',
												fontSize: { xs: '0.875rem', md: '1rem' },
												'&:hover': {
													color: 'primary.main',
													textDecoration: 'underline',
												},
												'&:disabled': {
													color: 'grey.400',
													cursor: 'not-allowed',
												},
											}}
										>
											¿Olvidaste tu contraseña?
										</Link>
									</Box>

									{/* Login Button */}
									<Button
										type="submit"
										variant="contained"
										fullWidth
										disabled={isLoading}
										size={isMobile ? "large" : "large"}
										sx={{
											bgcolor: '#00E676',
											color: 'white',
											py: { xs: 1.5, md: 2 },
											fontWeight: 600,
											fontSize: { xs: '1rem', md: '1.1rem' },
											borderRadius: 2,
											'&:hover': {
												bgcolor: '#00C853',
											},
											'&:disabled': {
												bgcolor: 'grey.300',
												color: 'grey.500',
											},
										}}
									>
										{isLoading ? (
											<CircularProgress size={24} sx={{ color: 'white' }} />
										) : (
											'Iniciar sesión'
										)}
									</Button>
								</Stack>
							</form>

							{/* Divider */}
							<Box sx={{ my: { xs: 2.5, md: 3 }, textAlign: 'center' }}>
								<Typography variant="body2" color="grey.600" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
									O inicia sesión con
								</Typography>
							</Box>

							{/* Social Login Buttons */}
							<Stack 
								direction={{ xs: 'column', sm: 'row' }} 
								spacing={{ xs: 1.5, sm: 2 }}
								sx={{ mb: { xs: 2, md: 3 } }}
							>
								<Button
									variant="outlined"
									fullWidth
									disabled={isLoading}
									onClick={() => handleSocialLogin('gmail')}
									size={isMobile ? "large" : "large"}
									sx={{
										borderColor: 'grey.300',
										color: 'grey.700',
										py: { xs: 1.5, md: 2 },
										fontSize: { xs: '0.9rem', md: '1rem' },
										borderRadius: 2,
										'&:hover': {
											borderColor: 'grey.400',
											bgcolor: 'grey.50',
										},
										'&:disabled': {
											borderColor: 'grey.200',
											color: 'grey.400',
										},
									}}
								>
									Continuar con Gmail
								</Button>
								<Button
									variant="outlined"
									fullWidth
									disabled={isLoading}
									onClick={() => handleSocialLogin('apple')}
									size={isMobile ? "large" : "large"}
									sx={{
										borderColor: 'grey.300',
										color: 'grey.700',
										py: { xs: 1.5, md: 2 },
										fontSize: { xs: '0.9rem', md: '1rem' },
										borderRadius: 2,
										'&:hover': {
											borderColor: 'grey.400',
											bgcolor: 'grey.50',
										},
										'&:disabled': {
											borderColor: 'grey.200',
											color: 'grey.400',
										},
									}}
								>
									Continuar con Apple
								</Button>
							</Stack>

							{/* Registration Link */}
							<Box sx={{ textAlign: 'center' }}>
								<Typography variant="body2" color="grey.600" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
									¿No tienes una cuenta?{' '}
									<Link
										component={RouterLink}
										to="/register"
										sx={{
											color: 'primary.main',
											textDecoration: 'none',
											fontWeight: 600,
											'&:hover': {
												textDecoration: 'underline',
											},
										}}
									>
										Regístrate
									</Link>
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Container>
			</Box>

			{/* Error Snackbar */}
			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={() => setError('')}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				sx={{ 
					width: { xs: '90%', sm: 'auto' },
					maxWidth: { xs: '100%', sm: '400px' }
				}}
			>
				<Alert 
					onClose={() => setError('')} 
					severity="error" 
					sx={{ width: '100%' }}
				>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default Login

