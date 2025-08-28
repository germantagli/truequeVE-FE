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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
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
import { useAuth } from '../contexts/AuthContext'
import OTPVerification from '../components/OTPVerification'


function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
	})
	const [type, setType] = useState<'email' | 'phone'>('email')
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		phone: '',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [showOTP, setShowOTP] = useState(false)
	const theme = useTheme()
	const navigate = useNavigate()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const { sendOTP } = useAuth()

	const validateForm = () => {
		const newErrors = {
			name: '',
			email: '',
			phone: '',
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

		// Validar email o teléfono según el tipo seleccionado
		if (type === 'email') {
			if (!formData.email.trim()) {
				newErrors.email = 'El correo electrónico es requerido'
				isValid = false
			} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				newErrors.email = 'Ingresa un correo electrónico válido'
				isValid = false
			}
		} else {
			if (!formData.phone.trim()) {
				newErrors.phone = 'El número de teléfono es requerido'
				isValid = false
			} else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
				newErrors.phone = 'Ingresa un número de teléfono válido'
				isValid = false
			}
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
			const success = await sendOTP(
				formData.email,
				formData.phone,
				type,
				'register'
			)
			
			if (success) {
				setShowOTP(true)
			} else {
				setError('Error al enviar el código OTP. Intenta nuevamente.')
			}
		} catch (err: any) {
			setError(err.message || 'Error al enviar el código OTP. Intenta nuevamente.')
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

	const handleTypeChange = (event: any) => {
		setType(event.target.value)
		// Limpiar errores al cambiar el tipo
		setErrors(prev => ({
			...prev,
			email: '',
			phone: ''
		}))
	}

	const handleOTPSuccess = () => {
		// Redirigir al home después del registro exitoso
		navigate('/')
	}

	const handleOTPCancel = () => {
		setShowOTP(false)
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
							{showOTP ? (
								<OTPVerification
									email={formData.email}
									phone={formData.phone}
									type={type}
									purpose="register"
									onSuccess={handleOTPSuccess}
									onCancel={handleOTPCancel}
									showPasswordField={true}
									additionalData={{
										name: formData.name,
									}}
								/>
							) : (
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

										{/* Type Selection */}
										<FormControl fullWidth variant="outlined">
											<InputLabel>Tipo de verificación</InputLabel>
											<Select
												value={type}
												onChange={handleTypeChange}
												label="Tipo de verificación"
												disabled={isLoading}
											>
												<MenuItem value="email">Email</MenuItem>
												<MenuItem value="phone">Teléfono</MenuItem>
											</Select>
										</FormControl>

										{/* Email Field - shown when type is email */}
										{type === 'email' && (
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
										)}

										{/* Phone Field - shown when type is phone */}
										{type === 'phone' && (
											<TextField
												fullWidth
												placeholder="Número de teléfono"
												type="tel"
												value={formData.phone}
												onChange={handleInputChange('phone')}
												variant="outlined"
												error={!!errors.phone}
												helperText={errors.phone}
												disabled={isLoading}
												size={isMobile ? "medium" : "medium"}
												sx={{
													'& .MuiOutlinedInput-root': {
														'& fieldset': {
															borderColor: errors.phone ? 'error.main' : 'grey.300',
														},
														'&:hover fieldset': {
															borderColor: errors.phone ? 'error.main' : 'grey.400',
														},
													},
												}}
											/>
										)}

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
												'Enviar código de verificación'
											)}
										</Button>
									</Stack>
								</form>
							)}

							{/* Login Link */}
							{!showOTP && (
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
							)}
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

			{/* Debug Component (solo en desarrollo) */}
			
		</Box>
	)
}

export default Register

