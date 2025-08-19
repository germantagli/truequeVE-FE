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
	Switch,
	FormControlLabel,
	Alert,
} from '@mui/material'
import SectionHeader from './SectionHeader'

interface ShippingFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		state: 'miranda',
		city: 'caracas',
		address: 'Av. Principal, Edificio Centro, Piso 5',
		postalCode: '1050',
		references: 'Frente al Centro Comercial',
		isPrimary: true,
	})
	const [showSuccess, setShowSuccess] = useState(false)

	const handleChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		onSave('Dirección guardada correctamente')
		setShowSuccess(true)
		setTimeout(() => setShowSuccess(false), 3000)
	}

	return (
		<Box>
			<SectionHeader
				title="Dirección de envío"
				description="Configura tu dirección principal para envíos"
			/>

			{showSuccess && (
				<Alert severity="success" sx={{ mb: 3 }}>
					Dirección guardada correctamente
				</Alert>
			)}

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel>Estado</InputLabel>
						<Select
							value={formData.state}
							onChange={(e) => handleChange('state', e.target.value)}
							label="Estado"
						>
							<MenuItem value="miranda">Miranda</MenuItem>
							<MenuItem value="caracas">Distrito Capital</MenuItem>
							<MenuItem value="aragua">Aragua</MenuItem>
							<MenuItem value="carabobo">Carabobo</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel>Ciudad</InputLabel>
						<Select
							value={formData.city}
							onChange={(e) => handleChange('city', e.target.value)}
							label="Ciudad"
						>
							<MenuItem value="caracas">Caracas</MenuItem>
							<MenuItem value="valencia">Valencia</MenuItem>
							<MenuItem value="maracay">Maracay</MenuItem>
							<MenuItem value="barquisimeto">Barquisimeto</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Dirección"
						value={formData.address}
						onChange={(e) => handleChange('address', e.target.value)}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Código postal"
						value={formData.postalCode}
						onChange={(e) => handleChange('postalCode', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Referencias"
						value={formData.references}
						onChange={(e) => handleChange('references', e.target.value)}
						helperText="Puntos de referencia para facilitar la entrega"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Switch
								checked={formData.isPrimary}
								onChange={(e) => handleChange('isPrimary', e.target.checked)}
							/>
						}
						label="Usar como dirección principal"
					/>
				</Grid>
			</Grid>

			<Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
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

export default ShippingForm
