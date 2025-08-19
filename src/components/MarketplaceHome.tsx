import React, { useState } from 'react'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	InputBase,
	Paper,
	Stack,
	Typography,
	Avatar,
	Chip,
	Rating,
	useTheme,
} from '@mui/material'
import {
	Category as CategoryIcon,
	LocationOn as LocationIcon,
	AttachMoney as MoneyIcon,
	Search as SearchIcon,
	Help as HelpIcon,
	Description as TermsIcon,
	Security as PrivacyIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from './shared/AppHeader'
import Footer from './shared/Footer'

// Mock data
const featuredItems = [
	{
		id: 1,
		title: 'iPhone 13 Pro',
		price: '$800',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPhone+13+Pro',
	},
	{
		id: 2,
		title: 'MacBook Air M1',
		price: '$1200',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=MacBook+Air',
	},
	{
		id: 3,
		title: 'PlayStation 5',
		price: '$500',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=PS5',
	},
]

const recentItems = [
	{
		id: 4,
		title: 'Nintendo Switch',
		description: 'Consola en perfecto estado',
		price: '$300',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Nintendo+Switch',
	},
	{
		id: 5,
		title: 'iPad Air',
		description: 'Tablet como nueva',
		price: '$600',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPad+Air',
	},
	{
		id: 6,
		title: 'AirPods Pro',
		description: 'Audífonos inalámbricos',
		price: '$200',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=AirPods+Pro',
	},
]

const categories = [
	{ name: 'Electrónica', icon: '📱' },
	{ name: 'Hogar', icon: '🏠' },
	{ name: 'Moda', icon: '👕' },
	{ name: 'Deportes', icon: '⚽' },
	{ name: 'Juegos', icon: '🎮' },
	{ name: 'Servicios', icon: '💼' },
]

const howItWorks = [
	{
		step: 1,
		title: 'Publica',
		description: 'Sube fotos y describe tu producto',
		icon: '📸',
	},
	{
		step: 2,
		title: 'Conecta',
		description: 'Encuentra personas interesadas',
		icon: '🤝',
	},
	{
		step: 3,
		title: 'Intercambia',
		description: 'Acuerda el trueque y listo',
		icon: '🔄',
	},
]

const testimonials = [
	{
		id: 1,
		name: 'María G.',
		avatar: 'https://via.placeholder.com/50x50/00E676/FFFFFF?text=MG',
		rating: 5,
		comment: 'Excelente plataforma, encontré exactamente lo que buscaba.',
	},
	{
		id: 2,
		name: 'Carlos R.',
		avatar: 'https://via.placeholder.com/50x50/00E676/FFFFFF?text=CR',
		rating: 5,
		comment: 'Muy fácil de usar y segura para hacer trueques.',
	},
	{
		id: 3,
		name: 'Ana L.',
		avatar: 'https://via.placeholder.com/50x50/00E676/FFFFFF?text=AL',
		rating: 5,
		comment: 'Perfecta para darle nueva vida a cosas que ya no uso.',
	},
]

function MarketplaceHome() {
	const [searchQuery, setSearchQuery] = useState('')
	const theme = useTheme()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const handleSearchClick = () => {
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
		}
	}

	const handleProductClick = (productId: number) => {
		navigate(`/product/${productId}`)
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />

			{/* Hero Section */}
			<Box
				sx={{
					background: 'linear-gradient(135deg, #00E676 0%, #00C853 100%)',
					color: 'white',
					py: { xs: 6, md: 12 },
					px: 2,
					textAlign: 'center',
					position: 'relative',
					width: '100%',
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundImage: 'url(https://via.placeholder.com/1920x600/00E676/FFFFFF?text=Background)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						opacity: 0.1,
						zIndex: 0,
					},
				}}
			>
				<Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
					<Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
						{t('home.hero.title')}
					</Typography>

					{/* Search Bar */}
					<Paper
						sx={{
							maxWidth: 600,
							mx: 'auto',
							mb: 4,
							p: 2,
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<SearchIcon color="action" />
						<InputBase
							placeholder={t('home.hero.searchPlaceholder')}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							sx={{ flex: 1, ml: 1 }}
						/>
						<Button variant="contained" sx={{ bgcolor: 'primary.main' }} onClick={handleSearchClick}>
							{t('home.hero.searchButton')}
						</Button>
					</Paper>

					{/* Quick Filters */}
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={2}
						justifyContent="center"
						alignItems="center"
					>
						<Chip icon={<CategoryIcon />} label="Categoría" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
						<Chip icon={<LocationIcon />} label="Ubicación" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
						<Chip icon={<MoneyIcon />} label="Precio" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
					</Stack>
				</Container>
			</Box>

			<Container maxWidth="lg" sx={{ py: 6, width: '100%', flex: 1 }}>
				{/* Featured Items */}
				<Box sx={{ mb: 8 }}>
					<Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
						Anuncios destacados
					</Typography>
					<Grid container spacing={3}>
						{featuredItems.map((item) => (
							<Grid xs={12} sm={6} md={4} key={item.id}>
								<Card 
									sx={{ 
										height: '100%', 
										display: 'flex', 
										flexDirection: 'column',
										cursor: 'pointer',
										'&:hover': { 
											transform: 'translateY(-4px)', 
											transition: 'transform 0.2s',
											boxShadow: 4
										}
									}}
									onClick={() => handleProductClick(item.id)}
								>
									<CardMedia
										component="img"
										height="200"
										image={item.image}
										alt={item.title}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography variant="h6" gutterBottom>
											{item.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{item.price}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Categories */}
				<Box sx={{ mb: 8 }}>
					<Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
						Categorías
					</Typography>
					<Grid container spacing={3}>
						{categories.map((category, index) => (
							<Grid xs={6} sm={4} md={2} key={index}>
								<Card sx={{ textAlign: 'center', p: 2, cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
									<Typography variant="h3" sx={{ mb: 1 }}>
										{category.icon}
									</Typography>
									<Typography variant="body2" fontWeight={500}>
										{category.name}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Recent Items */}
				<Box sx={{ mb: 8 }}>
					<Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
						Últimos publicados
					</Typography>
					<Grid container spacing={3}>
						{recentItems.map((item) => (
							<Grid item xs={12} sm={6} md={4} key={item.id}>
								<Card 
									sx={{ 
										height: '100%', 
										display: 'flex', 
										flexDirection: 'column',
										cursor: 'pointer',
										'&:hover': { 
											transform: 'translateY(-4px)', 
											transition: 'transform 0.2s',
											boxShadow: 4
										}
									}}
									onClick={() => handleProductClick(item.id)}
								>
									<CardMedia
										component="img"
										height="200"
										image={item.image}
										alt={item.title}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography variant="h6" gutterBottom>
											{item.title}
										</Typography>
										<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
											{item.description}
										</Typography>
										<Typography variant="body2" fontWeight={500} color="primary.main">
											{item.price}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>

				{/* How It Works */}
				<Box sx={{ mb: 8 }}>
					<Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
						¿Cómo funciona?
					</Typography>
					<Grid container spacing={4}>
						{howItWorks.map((step) => (
							<Grid item xs={12} md={4} key={step.step}>
								<Card sx={{ textAlign: 'center', p: 4, height: '100%' }}>
									<Typography variant="h1" sx={{ mb: 2, color: 'primary.main' }}>
										{step.icon}
									</Typography>
									<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
										Paso {step.step}: {step.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{step.description}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Testimonials */}
				<Box sx={{ mb: 8 }}>
					<Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
						Lo que dicen nuestros usuarios
					</Typography>
					<Grid container spacing={3}>
						{testimonials.map((testimonial) => (
							<Grid item xs={12} md={4} key={testimonial.id}>
								<Card sx={{ p: 3, height: '100%' }}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
										<Box>
											<Typography variant="subtitle1" fontWeight={600}>
												{testimonial.name}
											</Typography>
											<Rating value={testimonial.rating} readOnly size="small" />
										</Box>
									</Box>
									<Typography variant="body2" color="text.secondary">
										"{testimonial.comment}"
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>

			<Footer />
		</Box>
	)
}

export default MarketplaceHome

