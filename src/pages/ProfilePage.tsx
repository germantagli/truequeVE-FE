import React, { useState } from 'react'
import {
	Box,
	Container,
	Tabs,
	Tab,
	Typography,
	Divider,
	Switch,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Chip,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	useTheme,
} from '@mui/material'
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Search as SearchIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'
import ProfileHeader from '../components/shared/ProfileHeader'
import AdGrid from '../components/shared/AdGrid'
import EmptyState from '../components/shared/EmptyState'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`profile-tabpanel-${index}`}
			aria-labelledby={`profile-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	)
}

// Mock data
const mockAds = {
	active: [
		{
			id: '1',
			title: 'iPhone 12 Pro',
			image: 'https://via.placeholder.com/400x300/00E676/FFFFFF?text=iPhone+12+Pro',
			price: '$800 USD',
			status: 'active' as const,
		},
		{
			id: '2',
			title: 'MacBook Air M1',
			image: 'https://via.placeholder.com/400x300/00E676/FFFFFF?text=MacBook+Air',
			price: '$1200 USD',
			status: 'active' as const,
		},
	],
	paused: [
		{
			id: '3',
			title: 'PlayStation 5',
			image: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=PS5',
			price: '$500 USD',
			status: 'paused' as const,
		},
	],
	sold: [
		{
			id: '4',
			title: 'Bicicleta de montaña',
			image: 'https://via.placeholder.com/400x300/2E7CF6/FFFFFF?text=Bicicleta',
			price: '$400 USD',
			status: 'sold' as const,
		},
	],
}

const mockFavorites = [
	{
		id: '1',
		title: 'iPad Pro 11"',
		image: 'https://via.placeholder.com/400x300/00E676/FFFFFF?text=iPad+Pro',
		price: '$900 USD',
		acceptsTrade: true,
	},
	{
		id: '2',
		title: 'Guitarra acústica',
		image: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Guitarra',
		price: '$300 USD',
		acceptsTrade: false,
	},
]

const mockSavedSearches = [
	{
		id: '1',
		title: 'Electrónicos en Caracas',
		filters: ['Electrónica', 'Caracas', 'Precio: $100-$1000'],
		alertsEnabled: true,
	},
	{
		id: '2',
		title: 'Bicicletas usadas',
		filters: ['Deportes', 'Usado', 'Precio: $200-$800'],
		alertsEnabled: false,
	},
]

function ProfilePage() {
	const [tabValue, setTabValue] = useState(0)
	const [settings, setSettings] = useState({
		notifications: true,
		language: 'es',
	})
	const navigate = useNavigate()
	const theme = useTheme()

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	const handleAdAction = (action: string, adId: string) => {
		console.log(`${action} anuncio:`, adId)
		// Aquí se implementaría la lógica real
	}

	const handleFavoriteRemove = (favoriteId: string) => {
		console.log('Eliminar favorito:', favoriteId)
	}

	const handleSearchToggle = (searchId: string) => {
		console.log('Toggle alerta de búsqueda:', searchId)
	}

	const handleSearchDelete = (searchId: string) => {
		console.log('Eliminar búsqueda guardada:', searchId)
	}

	const handleSettingChange = (setting: string, value: any) => {
		setSettings(prev => ({ ...prev, [setting]: value }))
		console.log('Configuración actualizada:', setting, value)
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />
			
			<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
				{/* Profile Header */}
				<ProfileHeader
					name="Sofía Rodríguez"
					rating={4.8}
					reviewCount={126}
					bio="Vendedora confiable con más de 2 años en la plataforma. Especializada en electrónicos y artículos para el hogar."
				/>

				{/* Tabs */}
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						variant="scrollable"
						scrollButtons="auto"
						sx={{ mb: 2 }}
					>
						<Tab label="Mis anuncios" />
						<Tab label="Favoritos" />
						<Tab label="Búsquedas guardadas" />
					</Tabs>
				</Box>

				{/* Tab Content */}
				<TabPanel value={tabValue} index={0}>
					{/* Mis anuncios */}
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Activos ({mockAds.active.length})
					</Typography>
					<AdGrid
						ads={mockAds.active}
						status="active"
						onPause={(id) => handleAdAction('pausar', id)}
						onEdit={(id) => handleAdAction('editar', id)}
						onDelete={(id) => handleAdAction('eliminar', id)}
					/>

					<Divider sx={{ my: 4 }} />

					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Pausados ({mockAds.paused.length})
					</Typography>
					<AdGrid
						ads={mockAds.paused}
						status="paused"
						onActivate={(id) => handleAdAction('reactivar', id)}
						onEdit={(id) => handleAdAction('editar', id)}
						onDelete={(id) => handleAdAction('eliminar', id)}
					/>

					<Divider sx={{ my: 4 }} />

					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Vendidos ({mockAds.sold.length})
					</Typography>
					<AdGrid
						ads={mockAds.sold}
						status="sold"
						onViewDetails={(id) => handleAdAction('ver detalles', id)}
						onRepublish={(id) => handleAdAction('re-publicar', id)}
					/>
				</TabPanel>

				<TabPanel value={tabValue} index={1}>
					{/* Favoritos */}
					{mockFavorites.length > 0 ? (
						<Grid container spacing={3}>
							{mockFavorites.map((favorite) => (
								<Grid item xs={12} sm={6} md={4} key={favorite.id}>
									<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
										<CardMedia
											component="img"
											height="200"
											image={favorite.image}
											alt={favorite.title}
											sx={{ objectFit: 'cover' }}
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
												{favorite.title}
											</Typography>
											<Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mb: 2 }}>
												{favorite.price}
											</Typography>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												{favorite.acceptsTrade && (
													<Chip label="Trueque" color="success" size="small" />
												)}
												<IconButton
													size="small"
													color="error"
													onClick={() => handleFavoriteRemove(favorite.id)}
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					) : (
						<EmptyState
							title="No tienes favoritos"
							subtitle="Guarda tus productos favoritos para encontrarlos fácilmente más tarde."
							buttonText="Explorar anuncios"
							onAction={() => navigate('/search')}
						/>
					)}
				</TabPanel>

				<TabPanel value={tabValue} index={2}>
					{/* Búsquedas guardadas */}
					{mockSavedSearches.length > 0 ? (
						<List>
							{mockSavedSearches.map((search) => (
								<React.Fragment key={search.id}>
									<ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
										<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
											<Box sx={{ flex: 1 }}>
												<ListItemText
													primary={search.title}
													secondary={
														<Box sx={{ mt: 1 }}>
															{search.filters.map((filter, index) => (
																<Chip
																	key={index}
																	label={filter}
																	size="small"
																	sx={{ mr: 1, mb: 1 }}
																/>
															))}
														</Box>
													}
												/>
											</Box>
											<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
												<Switch
													checked={search.alertsEnabled}
													onChange={() => handleSearchToggle(search.id)}
													size="small"
												/>
												<IconButton size="small">
													<EditIcon />
												</IconButton>
												<IconButton
													size="small"
													color="error"
													onClick={() => handleSearchDelete(search.id)}
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</Box>
									</ListItem>
									<Divider />
								</React.Fragment>
							))}
						</List>
					) : (
						<EmptyState
							title="No tienes búsquedas guardadas"
							subtitle="Guarda tus búsquedas favoritas para recibir alertas cuando aparezcan nuevos productos."
							buttonText="Buscar productos"
							onAction={() => navigate('/search')}
						/>
					)}
				</TabPanel>

				{/* Ajustes */}
				<Box sx={{ mt: 6 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Ajustes
					</Typography>
					
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
						<Typography>Notificaciones</Typography>
						<Switch
							checked={settings.notifications}
							onChange={(e) => handleSettingChange('notifications', e.target.checked)}
						/>
					</Box>
					
					<Divider />
					
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
						<Typography>Idioma</Typography>
						<FormControl size="small" sx={{ minWidth: 120 }}>
							<Select
								value={settings.language}
								onChange={(e) => handleSettingChange('language', e.target.value)}
							>
								<MenuItem value="es">Español</MenuItem>
								<MenuItem value="en">Inglés</MenuItem>
								<MenuItem value="pt">Portugués</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			</Container>

			<Footer />
		</Box>
	)
}

export default ProfilePage
