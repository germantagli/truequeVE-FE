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
	InputAdornment,
} from '@mui/material'
import SectionHeader from './SectionHeader'

interface BillingFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const BillingForm: React.FC<BillingFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		businessName: 'Sofía Rodríguez',
		documentType: 'V',
		documentNumber: '12345678',
		fiscalAddress: 'Av. Principal, Edificio Centro, Piso 5, Caracas',
	})

	const handleChange = (field: string, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = () => {
		onSave('Datos de facturación guardados correctamente')
	}

	return (
		<Box>
			<SectionHeader
				title="Datos de facturación"
				description="Información para facturación y documentos legales"
			/>

			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Nombre / Razón social"
						value={formData.businessName}
						onChange={(e) => handleChange('businessName', e.target.value)}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<FormControl fullWidth>
						<InputLabel>Tipo de documento</InputLabel>
						<Select
							value={formData.documentType}
							onChange={(e) => handleChange('documentType', e.target.value)}
							label="Tipo de documento"
						>
							<MenuItem value="V">V- (Venezolano)</MenuItem>
							<MenuItem value="J">J- (Jurídico)</MenuItem>
							<MenuItem value="E">E- (Extranjero)</MenuItem>
							<MenuItem value="P">P- (Pasaporte)</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={8}>
					<TextField
						fullWidth
						label="Número de documento"
						value={formData.documentNumber}
						onChange={(e) => handleChange('documentNumber', e.target.value)}
						InputProps={{
							startAdornment: <InputAdornment position="start">{formData.documentType}-</InputAdornment>,
						}}
						placeholder="12345678"
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Dirección fiscal"
						value={formData.fiscalAddress}
						onChange={(e) => handleChange('fiscalAddress', e.target.value)}
						multiline
						rows={3}
						required
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

export default BillingForm
