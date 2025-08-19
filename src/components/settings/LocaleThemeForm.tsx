import React, { useState } from 'react'
import {
	Box,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material'
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material'
import SectionHeader from './SectionHeader'

interface LocaleThemeFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const LocaleThemeForm: React.FC<LocaleThemeFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		language: 'es',
		theme: 'system',
	})

	const handleLanguageChange = (language: string) => {
		setFormData(prev => ({ ...prev, language }))
		onSave('Idioma cambiado correctamente')
	}

	const handleThemeChange = (theme: string) => {
		setFormData(prev => ({ ...prev, theme }))
		onSave('Tema cambiado correctamente')
	}

	return (
		<Box>
			<SectionHeader
				title="Idioma y tema"
				description="Personaliza la apariencia y el idioma de la aplicación"
			/>

			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
						Idioma
					</Typography>
					<FormControl fullWidth>
						<InputLabel>Seleccionar idioma</InputLabel>
						<Select
							value={formData.language}
							onChange={(e) => handleLanguageChange(e.target.value)}
							label="Seleccionar idioma"
						>
							<MenuItem value="es">Español</MenuItem>
							<MenuItem value="en">English</MenuItem>
							<MenuItem value="pt">Português</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={6}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
						Tema
					</Typography>
					<ToggleButtonGroup
						value={formData.theme}
						exclusive
						onChange={(e, value) => value && handleThemeChange(value)}
						aria-label="tema"
						fullWidth
					>
						<ToggleButton value="light" aria-label="claro">
							<LightMode sx={{ mr: 1 }} />
							Claro
						</ToggleButton>
						<ToggleButton value="dark" aria-label="oscuro">
							<DarkMode sx={{ mr: 1 }} />
							Oscuro
						</ToggleButton>
						<ToggleButton value="system" aria-label="sistema">
							<SettingsBrightness sx={{ mr: 1 }} />
							Sistema
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
			</Grid>
		</Box>
	)
}

export default LocaleThemeForm
