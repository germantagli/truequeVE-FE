import React, { useState } from 'react'
import {
	Box,
	Grid,
	TextField,
	Button,
	FormControlLabel,
	Switch,
	Typography,
	Divider,
	Alert,
	InputAdornment,
	IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SectionHeader from './SectionHeader'

interface SecurityFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const SecurityForm: React.FC<SecurityFormProps> = ({ onSave }) => {
	const [passwordData, setPasswordData] = useState({
		current: '',
		new: '',
		confirm: '',
	})
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	})
	const [twoFA, setTwoFA] = useState({
		enabled: false,
		code: '',
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handlePasswordChange = (field: string, value: string) => {
		setPasswordData(prev => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }))
		}
	}

	const handleTogglePasswordVisibility = (field: string) => {
		setShowPasswords(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
	}

	const validatePassword = () => {
		const newErrors: Record<string, string> = {}
		
		if (!passwordData.current) {
			newErrors.current = 'La contraseña actual es obligatoria'
		}
		if (!passwordData.new) {
			newErrors.new = 'La nueva contraseña es obligatoria'
		} else if (passwordData.new.length < 8) {
			newErrors.new = 'La contraseña debe tener al menos 8 caracteres'
		} else if (!/\d/.test(passwordData.new)) {
			newErrors.new = 'La contraseña debe contener al menos un número'
		} else if (!/[A-Z]/.test(passwordData.new)) {
			newErrors.new = 'La contraseña debe contener al menos una mayúscula'
		}
		if (passwordData.new !== passwordData.confirm) {
			newErrors.confirm = 'Las contraseñas no coinciden'
		}
		
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handlePasswordSubmit = () => {
		if (validatePassword()) {
			onSave('Contraseña actualizada correctamente')
			setPasswordData({ current: '', new: '', confirm: '' })
		} else {
			onSave('Por favor corrige los errores en el formulario', 'error')
		}
	}

	const handleTwoFAToggle = () => {
		setTwoFA(prev => ({ ...prev, enabled: !prev.enabled }))
	}

	const handleTwoFASubmit = () => {
		if (twoFA.code.length === 6) {
			onSave('2FA habilitado correctamente')
			setTwoFA(prev => ({ ...prev, code: '' }))
		} else {
			onSave('El código debe tener 6 dígitos', 'error')
		}
	}

	return (
		<Box>
			<SectionHeader
				title="Seguridad"
				description="Gestiona la seguridad de tu cuenta"
			/>

			{/* Cambio de contraseña */}
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
				Cambiar contraseña
			</Typography>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Contraseña actual"
						type={showPasswords.current ? 'text' : 'password'}
						value={passwordData.current}
						onChange={(e) => handlePasswordChange('current', e.target.value)}
						error={!!errors.current}
						helperText={errors.current}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => handleTogglePasswordVisibility('current')}
										edge="end"
									>
										{showPasswords.current ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Nueva contraseña"
						type={showPasswords.new ? 'text' : 'password'}
						value={passwordData.new}
						onChange={(e) => handlePasswordChange('new', e.target.value)}
						error={!!errors.new}
						helperText={errors.new}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => handleTogglePasswordVisibility('new')}
										edge="end"
									>
										{showPasswords.new ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Confirmar nueva contraseña"
						type={showPasswords.confirm ? 'text' : 'password'}
						value={passwordData.confirm}
						onChange={(e) => handlePasswordChange('confirm', e.target.value)}
						error={!!errors.confirm}
						helperText={errors.confirm}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => handleTogglePasswordVisibility('confirm')}
										edge="end"
									>
										{showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>

			<Alert severity="info" sx={{ mb: 3 }}>
				La contraseña debe tener al menos 8 caracteres, un número y una letra mayúscula
			</Alert>

			<Button variant="contained" onClick={handlePasswordSubmit} sx={{ mb: 4 }}>
				Actualizar contraseña
			</Button>

			<Divider sx={{ my: 4 }} />

			{/* 2FA */}
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
				Autenticación de dos factores (2FA)
			</Typography>

			<FormControlLabel
				control={
					<Switch
						checked={twoFA.enabled}
						onChange={handleTwoFAToggle}
					/>
				}
				label="Habilitar 2FA"
				sx={{ mb: 2 }}
			/>

			{twoFA.enabled && (
				<Box sx={{ mb: 3 }}>
					<TextField
						fullWidth
						label="Código de verificación"
						value={twoFA.code}
						onChange={(e) => setTwoFA(prev => ({ ...prev, code: e.target.value }))}
						placeholder="123456"
						inputProps={{ maxLength: 6 }}
						sx={{ mb: 2 }}
					/>
					<Button variant="contained" onClick={handleTwoFASubmit}>
						Verificar
					</Button>
				</Box>
			)}

			<Alert severity="warning">
				La autenticación de dos factores añade una capa extra de seguridad a tu cuenta
			</Alert>
		</Box>
	)
}

export default SecurityForm
