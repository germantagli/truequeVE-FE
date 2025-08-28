import React, { useState } from 'react'
import {
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

import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'
import OTPVerification from '../components/OTPVerification'


function Login() {
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [type, setType] = useState<'email' | 'phone'>('email')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [showOTP, setShowOTP] = useState(false)
	const theme = useTheme()
	const navigate = useNavigate()
	const { sendOTP } = useAuth()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const { t } = useTranslation()



	const validateForm = () => {
		let isValid = true
		setEmailError('')
		setPhoneError('')

		// Validar email o teléfono según el tipo
		if (type === 'email') {
			if (!email.trim()) {
				setEmailError('Email requerido')
				isValid = false
			} else if (!/\S+@\S+\.\S+/.test(email)) {
				setEmailError('Email inválido')
				isValid = false
			}
		} else {
			if (!phone.trim()) {
				setPhoneError('Teléfono requerido')
				isValid = false
			} else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) {
				setPhoneError('Teléfono inválido')
				isValid = false
			}
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
			const success = await sendOTP(email, phone, type, 'login')
			
			if (success) {
				setShowOTP(true)
			} else {
				setError('Error al enviar código de verificación')
			}
		} catch (err: any) {
			setError(err.message || 'Error al enviar código de verificación')
		} finally {
			setIsLoading(false)
		}
	}

	const handleOTPSuccess = () => {
		navigate('/')
	}

	const handleOTPCancel = () => {
		setShowOTP(false)
		setError('')
	}

	const handleSocialLogin = (provider: 'gmail' | 'apple') => {
		setIsLoading(true)
		// Simular login social
		setTimeout(() => {
			setIsLoading(false)
			setError(t('login.errors.socialNotImplemented', { provider }))
		}, 1000)
	}



	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />
			
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
						{t('login.subtitle')}
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
							{/* Error Alert */}
							{error && (
								<Alert severity="error" sx={{ mb: 3 }}>
									{error}
								</Alert>
							)}

							{/* Show OTP Verification or Login Form */}
							{showOTP ? (
								<OTPVerification
									email={email}
									phone={phone}
									type={type}
									purpose="login"
									onSuccess={handleOTPSuccess}
									onCancel={handleOTPCancel}
									showPasswordField={false}
								/>
							) : (
								/* Login Form */
								<Box component="form" onSubmit={handleSubmit}>
								<Stack spacing={3}>
									{/* Type Selector */}
									<FormControl fullWidth>
										<InputLabel>Tipo de verificación</InputLabel>
										<Select
											value={type}
											onChange={(e) => setType(e.target.value as 'email' | 'phone')}
											label="Tipo de verificación"
											disabled={isLoading}
										>
											<MenuItem value="email">Email</MenuItem>
											<MenuItem value="phone">Teléfono</MenuItem>
										</Select>
									</FormControl>

									{/* Email/Phone Field */}
									{type === 'email' ? (
										<TextField
											fullWidth
											label="Email"
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											error={!!emailError}
											helperText={emailError}
											disabled={isLoading}
										/>
									) : (
										<TextField
											fullWidth
											label="Teléfono"
											type="tel"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											error={!!phoneError}
											helperText={phoneError}
											disabled={isLoading}
											placeholder="+584141234567"
										/>
									)}



									{/* Login Button */}
									<Button
										type="submit"
										fullWidth
										variant="contained"
										size="large"
										disabled={isLoading}
										sx={{
											bgcolor: 'primary.main',
											py: 1.5,
											fontSize: '1.1rem',
											fontWeight: 600,
											'&:hover': {
												bgcolor: 'primary.dark',
											},
											'&:disabled': {
												bgcolor: 'grey.400',
											}
										}}
									>
										{isLoading ? (
											<CircularProgress size={24} color="inherit" />
										) : (
											'Enviar Código de Verificación'
										)}
									</Button>

									{/* Divider */}
									<Divider sx={{ my: 2 }}>
										<Typography variant="body2" color="text.secondary">
											O continuar con
										</Typography>
									</Divider>

									{/* Social Login Button */}
									<Button
										fullWidth
										variant="outlined"
										onClick={() => handleSocialLogin('gmail')}
										disabled={isLoading}
										startIcon={
											<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
												<g fill="none" fillRule="evenodd">
													<path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
													<path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
													<path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
													<path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
												</g>
											</svg>
										}
										sx={{
											borderColor: '#dadce0',
											color: '#3c4043',
											backgroundColor: '#ffffff',
											textTransform: 'none',
											fontSize: '14px',
											fontWeight: 500,
											height: '40px',
											'&:hover': {
												borderColor: '#dadce0',
												backgroundColor: '#f8f9fa',
												boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
											},
											'&:disabled': {
												borderColor: '#dadce0',
												backgroundColor: '#f8f9fa',
												color: '#9aa0a6',
											}
										}}
									>
										Continuar con Google
									</Button>

									{/* Register Link */}
									<Box sx={{ textAlign: 'center', mt: 2 }}>
										<Typography variant="body2" color="text.secondary">
											{t('login.noAccount')}{' '}
											<Link
												component={RouterLink}
												to="/register"
												sx={{
													color: 'primary.main',
													textDecoration: 'none',
													fontWeight: 600,
													'&:hover': { textDecoration: 'underline' }
												}}
											>
												{t('login.signUp')}
											</Link>
										</Typography>
									</Box>
								</Stack>
							</Box>
							)}
						</CardContent>
					</Card>
				</Container>
			</Box>

			{/* Debug component for development */}
			

			<Footer />

			{/* Snackbar for notifications */}
			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={() => setError('')}
			>
				<Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default Login

