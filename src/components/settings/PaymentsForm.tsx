import React, { useState } from 'react'
import {
	Box,
	Grid,
	TextField,
	FormControlLabel,
	Switch,
	Button,
	Typography,
	Divider,
	Alert,
} from '@mui/material'
import SectionHeader from './SectionHeader'

interface PaymentsFormProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const PaymentsForm: React.FC<PaymentsFormProps> = ({ onSave }) => {
	const [formData, setFormData] = useState({
		zelle: { enabled: true, email: 'sofia@email.com' },
		usdt: { enabled: false, network: 'TRC20', wallet: '' },
		paypal: { enabled: true, email: 'sofia@paypal.com' },
		pagoMovil: { enabled: false, bank: 'Banesco', phone: '' },
		cash: { enabled: true },
	})

	const handleMethodToggle = (method: string, enabled: boolean) => {
		setFormData(prev => ({
			...prev,
			[method]: { ...prev[method as keyof typeof prev], enabled }
		}))
	}

	const handleFieldChange = (method: string, field: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[method]: { ...prev[method as keyof typeof prev], [field]: value }
		}))
	}

	const handleSubmit = () => {
		onSave('Métodos de pago guardados correctamente')
	}

	return (
		<Box>
			<SectionHeader
				title="Métodos de pago"
				description="Configura los métodos de pago que aceptas"
			/>

			<Alert severity="info" sx={{ mb: 3 }}>
				Los métodos de pago serán verificados manualmente por nuestro equipo
			</Alert>

			<Box sx={{ mb: 4 }}>
				{/* Zelle */}
				<Box sx={{ mb: 3 }}>
					<FormControlLabel
						control={
							<Switch
								checked={formData.zelle.enabled}
								onChange={(e) => handleMethodToggle('zelle', e.target.checked)}
							/>
						}
						label={
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Zelle
							</Typography>
						}
					/>
					{formData.zelle.enabled && (
						<Box sx={{ mt: 2, ml: 4 }}>
							<TextField
								fullWidth
								label="Email de Zelle"
								value={formData.zelle.email}
								onChange={(e) => handleFieldChange('zelle', 'email', e.target.value)}
								type="email"
							/>
						</Box>
					)}
				</Box>

				<Divider sx={{ my: 2 }} />

				{/* USDT */}
				<Box sx={{ mb: 3 }}>
					<FormControlLabel
						control={
							<Switch
								checked={formData.usdt.enabled}
								onChange={(e) => handleMethodToggle('usdt', e.target.checked)}
							/>
						}
						label={
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								USDT
							</Typography>
						}
					/>
					{formData.usdt.enabled && (
						<Box sx={{ mt: 2, ml: 4 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Red"
										value={formData.usdt.network}
										onChange={(e) => handleFieldChange('usdt', 'network', e.target.value)}
										select
									>
										<option value="TRC20">TRC20</option>
										<option value="ERC20">ERC20</option>
										<option value="BEP20">BEP20</option>
									</TextField>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Dirección de wallet"
										value={formData.usdt.wallet}
										onChange={(e) => handleFieldChange('usdt', 'wallet', e.target.value)}
										placeholder="TRC20 wallet address"
									/>
								</Grid>
							</Grid>
						</Box>
					)}
				</Box>

				<Divider sx={{ my: 2 }} />

				{/* PayPal */}
				<Box sx={{ mb: 3 }}>
					<FormControlLabel
						control={
							<Switch
								checked={formData.paypal.enabled}
								onChange={(e) => handleMethodToggle('paypal', e.target.checked)}
							/>
						}
						label={
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								PayPal
							</Typography>
						}
					/>
					{formData.paypal.enabled && (
						<Box sx={{ mt: 2, ml: 4 }}>
							<TextField
								fullWidth
								label="Email de PayPal"
								value={formData.paypal.email}
								onChange={(e) => handleFieldChange('paypal', 'email', e.target.value)}
								type="email"
							/>
						</Box>
					)}
				</Box>

				<Divider sx={{ my: 2 }} />

				{/* Pago Móvil */}
				<Box sx={{ mb: 3 }}>
					<FormControlLabel
						control={
							<Switch
								checked={formData.pagoMovil.enabled}
								onChange={(e) => handleMethodToggle('pagoMovil', e.target.checked)}
							/>
						}
						label={
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Pago Móvil
							</Typography>
						}
					/>
					{formData.pagoMovil.enabled && (
						<Box sx={{ mt: 2, ml: 4 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Banco"
										value={formData.pagoMovil.bank}
										onChange={(e) => handleFieldChange('pagoMovil', 'bank', e.target.value)}
										select
									>
										<option value="Banesco">Banesco</option>
										<option value="Banco de Venezuela">Banco de Venezuela</option>
										<option value="BBVA">BBVA</option>
										<option value="Bancaribe">Bancaribe</option>
									</TextField>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Número de teléfono"
										value={formData.pagoMovil.phone}
										onChange={(e) => handleFieldChange('pagoMovil', 'phone', e.target.value)}
										placeholder="0412-123-4567"
									/>
								</Grid>
							</Grid>
						</Box>
					)}
				</Box>

				<Divider sx={{ my: 2 }} />

				{/* Efectivo */}
				<Box sx={{ mb: 3 }}>
					<FormControlLabel
						control={
							<Switch
								checked={formData.cash.enabled}
								onChange={(e) => handleMethodToggle('cash', e.target.checked)}
							/>
						}
						label={
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Efectivo
							</Typography>
						}
					/>
				</Box>
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

export default PaymentsForm
