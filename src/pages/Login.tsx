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
} from '@mui/material'
import {
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'

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
	const { t } = useTranslation()

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const validateForm = () => {
		let isValid = true
		setEmailError('')
		setPasswordError('')

		// Validar email
		if (!email.trim()) {
			setEmailError(t('login.errors.emailRequired'))
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError(t('login.errors.emailInvalid'))
			isValid = false
		}

		// Validar contraseña
		if (!password.trim()) {
			setPasswordError(t('login.errors.passwordRequired'))
			isValid = false
		} else if (password.length < 6) {
			setPasswordError(t('login.errors.passwordMinLength'))
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
				setError(t('login.errors.invalidCredentials'))
			}
		} catch (err) {
			setError(t('login.errors.loginError'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleSocialLogin = (provider: 'gmail' | 'apple') => {
		setIsLoading(true)
		// Simular login social
		setTimeout(() => {
			setIsLoading(false)
			setError(t('login.errors.socialNotImplemented', { provider }))
		}, 1000)
	}

	const handleForgotPassword = () => {
		setError(t('login.errors.forgotPasswordNotImplemented'))
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

							{/* Login Form */}
							<Box component="form" onSubmit={handleSubmit}>
								<Stack spacing={3}>
									{/* Email Field */}
									<TextField
										fullWidth
										label={t('login.email')}
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										error={!!emailError}
										helperText={emailError}
										disabled={isLoading}
									/>

									{/* Password Field */}
									<TextField
										fullWidth
										label={t('login.password')}
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										error={!!passwordError}
										helperText={passwordError}
										disabled={isLoading}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleTogglePasswordVisibility}
														edge="end"
														disabled={isLoading}
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>

									{/* Forgot Password Link */}
									<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
										<Link
											component="button"
											variant="body2"
											onClick={handleForgotPassword}
											disabled={isLoading}
											sx={{ 
												color: 'primary.main',
												textDecoration: 'none',
												'&:hover': { textDecoration: 'underline' }
											}}
										>
											{t('login.forgotPassword')}
										</Link>
									</Box>

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
											t('login.signIn')
										)}
									</Button>

									{/* Divider */}
									<Divider sx={{ my: 2 }}>
										<Typography variant="body2" color="text.secondary">
											{t('login.or')} {t('login.continueWith')}
										</Typography>
									</Divider>

									{/* Social Login Buttons */}
									<Stack direction="row" spacing={2}>
										<Button
											fullWidth
											variant="outlined"
											onClick={() => handleSocialLogin('gmail')}
											disabled={isLoading}
											sx={{
												borderColor: 'grey.300',
												color: 'text.primary',
												'&:hover': {
													borderColor: 'grey.400',
													bgcolor: 'grey.50',
												}
											}}
										>
											Gmail
										</Button>
										<Button
											fullWidth
											variant="outlined"
											onClick={() => handleSocialLogin('apple')}
											disabled={isLoading}
											sx={{
												borderColor: 'grey.300',
												color: 'text.primary',
												'&:hover': {
													borderColor: 'grey.400',
													bgcolor: 'grey.50',
												}
											}}
										>
											Apple
										</Button>
									</Stack>

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
						</CardContent>
					</Card>
				</Container>
			</Box>

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

