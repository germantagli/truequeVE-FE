import React, { useState } from 'react'
import {
	Box,
	FormControlLabel,
	Switch,
	Button,
	Typography,
	Alert,
} from '@mui/material'
import SectionHeader from './SectionHeader'

interface PrivacyFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const PrivacyForm: React.FC<PrivacyFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		publicProfile: true,
		showLocation: false,
		allowUnverifiedMessages: true,
	})

	const handleChange = (field: string, value: boolean) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		onSave('Configuración de privacidad guardada correctamente')
	}

	return (
		<Box>
			<SectionHeader
				title="Privacidad"
				description="Controla qué información es visible para otros usuarios"
			/>

			<Alert severity="info" sx={{ mb: 3 }}>
				Estos ajustes afectan cómo otros usuarios pueden ver tu información
			</Alert>

			<Box sx={{ mb: 4 }}>
				<FormControlLabel
					control={
						<Switch
							checked={formData.publicProfile}
							onChange={(e) => handleChange('publicProfile', e.target.checked)}
						/>
					}
					label={
						<Box>
							<Typography variant="body1" sx={{ fontWeight: 500 }}>
								Perfil público
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Permite que otros usuarios vean tu perfil y valoraciones
							</Typography>
						</Box>
					}
					sx={{ mb: 3, display: 'block' }}
				/>

				<FormControlLabel
					control={
						<Switch
							checked={formData.showLocation}
							onChange={(e) => handleChange('showLocation', e.target.checked)}
						/>
					}
					label={
						<Box>
							<Typography variant="body1" sx={{ fontWeight: 500 }}>
								Mostrar ubicación aproximada
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Muestra tu ciudad en tu perfil público
							</Typography>
						</Box>
					}
					sx={{ mb: 3, display: 'block' }}
				/>

				<FormControlLabel
					control={
						<Switch
							checked={formData.allowUnverifiedMessages}
							onChange={(e) => handleChange('allowUnverifiedMessages', e.target.checked)}
						/>
					}
					label={
						<Box>
							<Typography variant="body1" sx={{ fontWeight: 500 }}>
								Permitir mensajes de usuarios no verificados
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Recibe mensajes de usuarios que aún no han verificado su identidad
							</Typography>
						</Box>
					}
					sx={{ mb: 3, display: 'block' }}
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
		</Box>
	)
}

export default PrivacyForm
