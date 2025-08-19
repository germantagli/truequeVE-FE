import React, { useState } from 'react'
import {
	Box,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Alert,
} from '@mui/material'
import SectionHeader from './SectionHeader'

interface PersonalFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const PersonalForm: React.FC<PersonalFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		firstName: 'Sofía',
		lastName: 'Rodríguez',
		alias: 'sofia_tech',
		bio: 'Vendedora confiable con más de 2 años en la plataforma.',
		birthDate: '1995-03-15',
		gender: 'female',
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }))
		}
	}

	const validate = () => {
		const newErrors: Record<string, string> = {}
		
		if (!formData.firstName.trim()) {
			newErrors.firstName = 'El nombre es obligatorio'
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = 'El apellido es obligatorio'
		}
		
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = () => {
		if (validate()) {
			onSave('Datos personales guardados correctamente')
		} else {
			onSave('Por favor corrige los errores en el formulario', 'error')
		}
	}

	return (
		<Box>
			<SectionHeader
				title="Datos personales"
				description="Actualiza tu información personal básica"
			/>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Nombre"
						value={formData.firstName}
						onChange={(e) => handleChange('firstName', e.target.value)}
						error={!!errors.firstName}
						helperText={errors.firstName}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Apellido"
						value={formData.lastName}
						onChange={(e) => handleChange('lastName', e.target.value)}
						error={!!errors.lastName}
						helperText={errors.lastName}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Alias (opcional)"
						value={formData.alias}
						onChange={(e) => handleChange('alias', e.target.value)}
						helperText="Nombre de usuario público"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel>Género</InputLabel>
						<Select
							value={formData.gender}
							onChange={(e) => handleChange('gender', e.target.value)}
							label="Género"
						>
							<MenuItem value="female">Femenino</MenuItem>
							<MenuItem value="male">Masculino</MenuItem>
							<MenuItem value="other">Otro</MenuItem>
							<MenuItem value="prefer-not">Prefiero no decir</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Fecha de nacimiento"
						type="date"
						value={formData.birthDate}
						onChange={(e) => handleChange('birthDate', e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Biografía"
						value={formData.bio}
						onChange={(e) => handleChange('bio', e.target.value)}
						multiline
						rows={4}
						helperText="Cuéntanos un poco sobre ti"
					/>
				</Grid>
			</Grid>

			<Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
				<Button variant="contained" onClick={handleSubmit}>
					Guardar cambios
				</Button>
				<Button variant="outlined">
					Cancelar
				</Button>
			</Box>
		</Box>
	)
}

export default PersonalForm
