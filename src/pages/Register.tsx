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
	PersonAdd as RegisterIcon,
} from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function Register() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const theme = useTheme()
	const navigate = useNavigate()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleToggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	const validateForm = () => {
		const newErrors = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		}
		let isValid = true

		// Validar nombre
		if (!formData.name.trim()) {
			newErrors.name = 'El nombre es requerido'
			isValid = false
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'El nombre debe tener al menos 2 caracteres'
			isValid = false
		}

		// Validar email
		if (!formData.email.trim()) {
			newErrors.email = 'El correo electrónico es requerido'
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Ingresa un correo electrónico válido'
			isValid = false
		}

		// Validar contraseña
		if (!formData.password.trim()) {
			newErrors.password = 'La contraseña es requerida'
			isValid = false
		} else if (formData.password.length < 6) {
			newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
			isValid = false
		}

		// Validar confirmación de contraseña
		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = 'Confirma tu contraseña'
			isValid = false
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Las contraseñas no coinciden'
			isValid = false
		}

		setErrors(newErrors)
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
			// Simular registro
			await new Promise(resolve => setTimeout(resolve, 1500))
			
			// Redirigir al login
			navigate('/login')
		} catch (err) {
			setError('Error al crear la cuenta. Intenta nuevamente.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[field]: event.target.value
		}))
		// Limpiar error del campo cuando el usuario empiece a escribir
		if (errors[field as keyof typeof errors]) {
			setErrors(prev => ({
				...prev,
				[field]: ''
			}))
		}
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
							startIcon={<RegisterIcon />}
							sx={{ 
								bgcolor: 'grey.100',
								borderColor: 'grey.300',
								'&:hover': {
									bgcolor: 'grey.200',
								}
							}}
						>
							Registrarse
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
						Únete a TruequeYa
					</Typography>

					{/* Register Form Card */}
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
									{/* Name Field */}
									<TextField
										fullWidth
										placeholder="Nombre completo"
										value={formData.name}
										onChange={handleInputChange('name')}
										variant="outlined"
										error={!!errors.name}
										helperText={errors.name}
										disabled={isLoading}
										size={isMobile ? "medium" : "medium"}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: errors.name ? 'error.main' : 'grey.300',
												},
												'&:hover fieldset': {
													borderColor: errors.name ? 'error.main' : 'grey.400',
												},
											},
										}}
									/>

									{/* Email Field */}
									<TextField
										fullWidth
										placeholder="Correo electrónico"
										type="email"
										value={formData.email}
										onChange={handleInputChange('email')}
										variant="outlined"
										error={!!errors.email}
										helperText={errors.email}
										disabled={isLoading}
										size={isMobile ? "medium" : "medium"}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: errors.email ? 'error.main' : 'grey.300',
												},
												'&:hover fieldset': {
													borderColor: errors.email ? 'error.main' : 'grey.400',
												},
											},
										}}
									/>

									{/* Password Field */}
									<TextField
										fullWidth
										placeholder="Contraseña"
										type={showPassword ? 'text' : 'password'}
										value={formData.password}
										onChange={handleInputChange('password')}
										variant="outlined"
										error={!!errors.password}
										helperText={errors.password}
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
													borderColor: errors.password ? 'error.main' : 'grey.300',
												},
												'&:hover fieldset': {
													borderColor: errors.password ? 'error.main' : 'grey.400',
												},
											},
										}}
									/>

									{/* Confirm Password Field */}
									<TextField
										fullWidth
										placeholder="Confirmar contraseña"
										type={showConfirmPassword ? 'text' : 'password'}
										value={formData.confirmPassword}
										onChange={handleInputChange('confirmPassword')}
										variant="outlined"
										error={!!errors.confirmPassword}
										helperText={errors.confirmPassword}
										disabled={isLoading}
										size={isMobile ? "medium" : "medium"}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleToggleConfirmPasswordVisibility}
														edge="end"
														disabled={isLoading}
														sx={{ color: 'grey.500' }}
													>
														{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
										sx={{
											'& .MuiOutlinedInput-root': {
												'& fieldset': {
													borderColor: errors.confirmPassword ? 'error.main' : 'grey.300',
												},
												'&:hover fieldset': {
													borderColor: errors.confirmPassword ? 'error.main' : 'grey.400',
												},
											},
										}}
									/>

									{/* Register Button */}
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
											'Crear cuenta'
										)}
									</Button>
								</Stack>
							</form>

							{/* Login Link */}
							<Box sx={{ textAlign: 'center', mt: { xs: 2, md: 3 } }}>
								<Typography variant="body2" color="grey.600" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
									¿Ya tienes una cuenta?{' '}
									<Link
										component={RouterLink}
										to="/login"
										sx={{
											color: 'primary.main',
											textDecoration: 'none',
											fontWeight: 600,
											'&:hover': {
												textDecoration: 'underline',
											},
										}}
									>
										Inicia sesión
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

export default Register

