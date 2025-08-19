import React, { useState } from 'react'
import {
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Switch,
	FormControlLabel,
	Button,
	Divider,
	Checkbox,
	ListItemText,
	OutlinedInput,
} from '@mui/material'

interface FilterValues {
	category: string
	location: string
	priceMin: string
	priceMax: string
	condition: string
	acceptsTrade: boolean
	paymentMethods: string[]
	delivery: string
}

interface FiltersPanelProps {
	onApply: (filters: FilterValues) => void
	onClear: () => void
	initialFilters?: Partial<FilterValues>
	isMobile?: boolean
}

const categories = [
	'Electrónica',
	'Hogar',
	'Moda',
	'Deportes',
	'Juegos',
	'Servicios',
	'Vehículos',
	'Inmuebles',
]

const locations = [
	'Caracas',
	'Valencia',
	'Maracaibo',
	'Barquisimeto',
	'Maracay',
	'Ciudad Guayana',
	'Puerto La Cruz',
	'Petare',
]

const conditions = ['Nuevo', 'Como nuevo', 'Usado', 'Para reparar']

const paymentMethods = [
	{ value: 'zelle', label: 'Zelle' },
	{ value: 'usdt', label: 'USDT' },
	{ value: 'paypal', label: 'PayPal' },
	{ value: 'pago-movil', label: 'Pago Móvil' },
	{ value: 'efectivo', label: 'Efectivo' },
]

const deliveryOptions = ['Envío', 'Retiro', 'Punto de encuentro']

const FiltersPanel: React.FC<FiltersPanelProps> = ({
	onApply,
	onClear,
	initialFilters = {},
	isMobile = false,
}) => {
	const [filters, setFilters] = useState<FilterValues>({
		category: '',
		location: '',
		priceMin: '',
		priceMax: '',
		condition: '',
		acceptsTrade: false,
		paymentMethods: [],
		delivery: '',
		...initialFilters,
	})

	const handleChange = (field: keyof FilterValues, value: any) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	const handlePaymentMethodsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const value = event.target.value
		handleChange('paymentMethods', typeof value === 'string' ? value.split(',') : value as string[])
	}

	const handleApply = () => {
		onApply(filters)
	}

	const handleClear = () => {
		const clearedFilters: FilterValues = {
			category: '',
			location: '',
			priceMin: '',
			priceMax: '',
			condition: '',
			acceptsTrade: false,
			paymentMethods: [],
			delivery: '',
		}
		setFilters(clearedFilters)
		onClear()
	}

	return (
		<Box sx={{ p: isMobile ? 2 : 3 }}>
			<Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
				Filtros
			</Typography>

			{/* Categoría */}
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel>Categoría</InputLabel>
				<Select
					value={filters.category}
					label="Categoría"
					onChange={(e) => handleChange('category', e.target.value)}
				>
					<MenuItem value="">Todas las categorías</MenuItem>
					{categories.map((category) => (
						<MenuItem key={category} value={category}>
							{category}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Ubicación */}
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel>Ubicación</InputLabel>
				<Select
					value={filters.location}
					label="Ubicación"
					onChange={(e) => handleChange('location', e.target.value)}
				>
					<MenuItem value="">Todas las ubicaciones</MenuItem>
					{locations.map((location) => (
						<MenuItem key={location} value={location}>
							{location}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Precio */}
			<Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
				Precio
			</Typography>
			<Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
				<TextField
					label="Min"
					value={filters.priceMin}
					onChange={(e) => handleChange('priceMin', e.target.value)}
					sx={{ flex: 1 }}
					placeholder="0"
				/>
				<TextField
					label="Max"
					value={filters.priceMax}
					onChange={(e) => handleChange('priceMax', e.target.value)}
					sx={{ flex: 1 }}
					placeholder="∞"
				/>
			</Box>

			{/* Condición */}
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel>Condición</InputLabel>
				<Select
					value={filters.condition}
					label="Condición"
					onChange={(e) => handleChange('condition', e.target.value)}
				>
					<MenuItem value="">Cualquier condición</MenuItem>
					{conditions.map((condition) => (
						<MenuItem key={condition} value={condition}>
							{condition}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Acepta trueque */}
			<FormControlLabel
				control={
					<Switch
						checked={filters.acceptsTrade}
						onChange={(e) => handleChange('acceptsTrade', e.target.checked)}
						color="primary"
					/>
				}
				label="Acepta trueque"
				sx={{ mb: 3 }}
			/>

			<Divider sx={{ my: 2 }} />

			{/* Métodos de pago */}
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel>Métodos de pago</InputLabel>
				<Select
					multiple
					value={filters.paymentMethods}
					onChange={handlePaymentMethodsChange}
					input={<OutlinedInput label="Métodos de pago" />}
					renderValue={(selected) => selected.join(', ')}
				>
					{paymentMethods.map((method) => (
						<MenuItem key={method.value} value={method.value}>
							<Checkbox checked={filters.paymentMethods.indexOf(method.value) > -1} />
							<ListItemText primary={method.label} />
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Entrega */}
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel>Entrega</InputLabel>
				<Select
					value={filters.delivery}
					label="Entrega"
					onChange={(e) => handleChange('delivery', e.target.value)}
				>
					<MenuItem value="">Cualquier método</MenuItem>
					{deliveryOptions.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Botones de acción */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Button
					variant="contained"
					onClick={handleApply}
					sx={{
						bgcolor: '#00E676',
						color: 'white',
						py: 1.5,
						fontWeight: 600,
						'&:hover': { bgcolor: '#00C853' },
					}}
				>
					Aplicar filtros
				</Button>
				<Button
					variant="text"
					onClick={handleClear}
					sx={{ color: 'text.secondary' }}
				>
					Limpiar
				</Button>
			</Box>
		</Box>
	)
}

export default FiltersPanel
