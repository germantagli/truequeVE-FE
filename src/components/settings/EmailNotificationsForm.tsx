import React, { useState } from 'react'
import {
	Box,
	TextField,
	Button,
	FormControlLabel,
	Switch,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Alert,
} from '@mui/material'
import SectionHeader from './SectionHeader'

interface EmailNotificationsFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const EmailNotificationsForm: React.FC<EmailNotificationsFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		email: 'sofia@email.com',
		emailNotifications: true,
		pushNotifications: true,
		weeklySummaries: false,
	})
	const [changeEmailDialog, setChangeEmailDialog] = useState(false)
	const [newEmailData, setNewEmailData] = useState({
		email: '',
		password: '',
	})

	const handleChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		onSave('Preferencias de notificaciones guardadas correctamente')
	}

	const handleChangeEmail = () => {
		if (newEmailData.email && newEmailData.password) {
			onSave('Email actualizado correctamente')
			setFormData(prev => ({ ...prev, email: newEmailData.email }))
			setNewEmailData({ email: '', password: '' })
			setChangeEmailDialog(false)
		} else {
			onSave('Por favor completa todos los campos', 'error')
		}
	}

	return (
		<Box>
			<SectionHeader
				title="Email y notificaciones"
				description="Gestiona tu email y preferencias de notificaciones"
			/>

			{/* Email actual */}
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
				Email actual
			</Typography>
			
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
				<TextField
					fullWidth
					label="Email"
					value={formData.email}
					disabled
					sx={{ maxWidth: 400 }}
				/>
				<Button
					variant="outlined"
					onClick={() => setChangeEmailDialog(true)}
				>
					Cambiar email
				</Button>
			</Box>

			{/* Preferencias de notificaciones */}
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
				Preferencias de notificaciones
			</Typography>

			<Box sx={{ mb: 4 }}>
				<FormControlLabel
					control={
						<Switch
							checked={formData.emailNotifications}
							onChange={(e) => handleChange('emailNotifications', e.target.checked)}
						/>
					}
					label="Notificaciones por email"
					sx={{ mb: 2, display: 'block' }}
				/>
				<FormControlLabel
					control={
						<Switch
							checked={formData.pushNotifications}
							onChange={(e) => handleChange('pushNotifications', e.target.checked)}
						/>
					}
					label="Notificaciones push"
					sx={{ mb: 2, display: 'block' }}
				/>
				<FormControlLabel
					control={
						<Switch
							checked={formData.weeklySummaries}
							onChange={(e) => handleChange('weeklySummaries', e.target.checked)}
						/>
					}
					label="Resúmenes semanales"
					sx={{ mb: 2, display: 'block' }}
				/>
			</Box>

			<Box sx={{ display: 'flex', gap: 2 }}>
				<Button variant="contained" onClick={handleSubmit}>
					Guardar
				</Button>
				<Button variant="outlined">
					Cancelar
				</Button>
			</Box>

			{/* Dialog for changing email */}
			<Dialog open={changeEmailDialog} onClose={() => setChangeEmailDialog(false)}>
				<DialogTitle>Cambiar email</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						label="Nuevo email"
						value={newEmailData.email}
						onChange={(e) => setNewEmailData(prev => ({ ...prev, email: e.target.value }))}
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						label="Contraseña actual"
						type="password"
						value={newEmailData.password}
						onChange={(e) => setNewEmailData(prev => ({ ...prev, password: e.target.value }))}
						sx={{ mb: 2 }}
					/>
					<Alert severity="info">
						Para cambiar el email, necesitamos que nos confirmes tu contraseña actual.
					</Alert>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setChangeEmailDialog(false)}>Cancelar</Button>
					<Button onClick={handleChangeEmail} variant="contained">
						Cambiar email
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default EmailNotificationsForm
