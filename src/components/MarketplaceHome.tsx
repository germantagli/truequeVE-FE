import React, { useState } from 'react'
import {
	AppBar,
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Paper,
	Rating,
	TextField,
	Toolbar,
	Typography,
	Avatar,
	Chip,
	Divider,
	Stack,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import {
	Search as SearchIcon,
	Menu as MenuIcon,
	Person as PersonIcon,
	Notifications as NotificationsIcon,
	Home as HomeIcon,
	Category as CategoryIcon,
	Add as AddIcon,
	Login as LoginIcon,
	LocationOn as LocationIcon,
	AttachMoney as MoneyIcon,
	Star as StarIcon,
	Help as HelpIcon,
	Description as TermsIcon,
	PrivacyTip as PrivacyIcon,
	Logout as LogoutIcon,
	Chat as ChatIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Datos de ejemplo actualizados con IDs únicos
const featuredItems = [
	{
		id: 1,
		title: 'iPhone 12 Pro',
		price: 'Intercambio por Samsung Galaxy',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPhone+12+Pro',
	},
	{
		id: 2,
		title: 'Bicicleta de montaña',
		price: 'Intercambio por patineta',
		image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Bicicleta',
	},
	{
		id: 3,
		title: 'Guitarra acústica',
		price: 'Intercambio por teclado',
		image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=Guitarra',
	},
]

const categories = [
	{ name: 'Electrónicos', icon: '📱' },
	{ name: 'Ropa', icon: '👕' },
	{ name: 'Hogar', icon: '🏠' },
	{ name: 'Deportes', icon: '⚽' },
	{ name: 'Libros', icon: '📚' },
	{ name: 'Juguetes', icon: '🧸' },
]

const recentItems = [
	{
		id: 4,
		title: 'Laptop Dell Inspiron',
		description: 'Laptop en excelente estado, solo 2 años de uso',
		price: 'Intercambio por MacBook',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Laptop',
	},
	{
		id: 5,
		title: 'Cámara Canon EOS',
		description: 'Cámara profesional con lentes incluidos',
		price: 'Intercambio por GoPro',
		image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Cámara',
	},
	{
		id: 6,
		title: 'Mesa de escritorio',
		description: 'Mesa de madera sólida, perfecta para home office',
		price: 'Intercambio por silla ergonómica',
		image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=Mesa',
	},
]

const testimonials = [
	{
		id: 1,
		name: 'María González',
		rating: 5,
		comment: 'Excelente plataforma, encontré exactamente lo que necesitaba intercambiando mi guitarra.',
		avatar: 'https://via.placeholder.com/60x60/00E676/FFFFFF?text=MG',
	},
	{
		id: 2,
		name: 'Carlos Rodríguez',
		rating: 5,
		comment: 'Muy fácil de usar y seguro. Recomiendo totalmente esta app.',
		avatar: 'https://via.placeholder.com/60x60/FF6B35/FFFFFF?text=CR',
	},
	{
		id: 3,
		name: 'Ana Martínez',
		rating: 4,
		comment: 'Gran experiencia intercambiando productos. La comunidad es muy amigable.',
		avatar: 'https://via.placeholder.com/60x60/2E7CF6/FFFFFF?text=AM',
	},
]

const howItWorks = [
	{
		step: 1,
		title: 'Publica lo que no usas',
		description: 'Sube fotos y describe los artículos que quieres intercambiar',
		icon: '📤',
	},
	{
		step: 2,
		title: 'Encuentra lo que necesitas',
		description: 'Busca entre miles de productos disponibles para intercambio',
		icon: '🔍',
	},
	{
		step: 3,
		title: 'Intercambia fácilmente',
		description: 'Acuerda el intercambio y coordina la entrega',
		icon: '🤝',
	},
]

function MarketplaceHome() {
	const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)
	const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()
	const { isAuthenticated, user, logout } = useAuth()

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMenuAnchor(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMenuAnchor(null)
	}

	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenuAnchor(event.currentTarget)
	}

	const handleUserMenuClose = () => {
		setUserMenuAnchor(null)
	}

	const handleLogout = () => {
		logout()
		handleUserMenuClose()
		navigate('/')
	}

	const handleProductClick = (productId: number) => {
		navigate(`/product/${productId}`)
	}

	return (
		<Box sx={{ 
			minHeight: '100vh', 
			bgcolor: 'background.default',
			display: 'flex',
			flexDirection: 'column',
			width: '100%'
		}}>
			{/* Header */}
			<AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Toolbar>
					<Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', flexGrow: 1 }}>
						TruequeYa
					</Typography>

					{/* Desktop Navigation */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
						<Button startIcon={<HomeIcon />} color="inherit">Inicio</Button>
						<Button startIcon={<CategoryIcon />} color="inherit">Categorías</Button>
						<Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: 'primary.main' }}>
							Publicar
						</Button>
						
						{isAuthenticated ? (
							<>
								<IconButton color="inherit" onClick={() => navigate('/chat')}>
									<ChatIcon />
								</IconButton>
								<IconButton color="inherit">
									<NotificationsIcon />
								</IconButton>
								<IconButton 
									color="inherit" 
									onClick={handleUserMenuOpen}
									sx={{ 
										bgcolor: 'primary.main', 
										color: 'white',
										'&:hover': { bgcolor: 'primary.dark' }
									}}
								>
									<PersonIcon />
								</IconButton>
							</>
						) : (
							<Button variant="outlined" startIcon={<LoginIcon />} onClick={() => navigate('/login')}>
								Iniciar sesión
							</Button>
						)}
					</Box>

					{/* Mobile Menu Button */}
					<IconButton
						sx={{ display: { xs: 'flex', md: 'none' } }}
						onClick={handleMobileMenuOpen}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Mobile Menu */}
			<Menu
				anchorEl={mobileMenuAnchor}
				open={Boolean(mobileMenuAnchor)}
				onClose={handleMobileMenuClose}
				sx={{ display: { xs: 'block', md: 'none' } }}
			>
				<MenuItem onClick={handleMobileMenuClose}>
					<HomeIcon sx={{ mr: 1 }} /> Inicio
				</MenuItem>
				<MenuItem onClick={handleMobileMenuClose}>
					<CategoryIcon sx={{ mr: 1 }} /> Categorías
				</MenuItem>
				<MenuItem onClick={handleMobileMenuClose}>
					<AddIcon sx={{ mr: 1 }} /> Publicar
				</MenuItem>
				{isAuthenticated ? (
					<>
						<MenuItem onClick={() => { handleMobileMenuClose(); navigate('/chat'); }}>
							<ChatIcon sx={{ mr: 1 }} /> Chat
						</MenuItem>
						<MenuItem onClick={handleMobileMenuClose}>
							<PersonIcon sx={{ mr: 1 }} /> Mi Perfil
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<LogoutIcon sx={{ mr: 1 }} /> Cerrar sesión
						</MenuItem>
					</>
				) : (
					<MenuItem onClick={() => { handleMobileMenuClose(); navigate('/login'); }}>
						<LoginIcon sx={{ mr: 1 }} /> Iniciar sesión
					</MenuItem>
				)}
			</Menu>

			{/* User Menu */}
			<Menu
				anchorEl={userMenuAnchor}
				open={Boolean(userMenuAnchor)}
				onClose={handleUserMenuClose}
			>
				<MenuItem disabled>
					<Typography variant="body2" color="text.secondary">
						{user?.email}
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleUserMenuClose}>
					<PersonIcon sx={{ mr: 1 }} /> Mi Perfil
				</MenuItem>
				<MenuItem onClick={handleUserMenuClose}>
					<NotificationsIcon sx={{ mr: 1 }} /> Notificaciones
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>
					<LogoutIcon sx={{ mr: 1 }} /> Cerrar sesión
				</MenuItem>
			</Menu>

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
						Encuentra lo que buscas, intercambia lo que no usas
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
							placeholder="¿Qué estás buscando?"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							sx={{ flex: 1, ml: 1 }}
						/>
						<Button variant="contained" sx={{ bgcolor: 'primary.main' }}>
							Buscar
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

			<Container maxWidth="lg" sx={{ py: 6, width: '100%' }}>
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

			{/* Footer */}
			<Box
				component="footer"
				sx={{
					bgcolor: 'grey.100',
					py: 4,
					width: '100%',
					borderTop: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Container maxWidth="lg">
					<Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
						<Button startIcon={<HelpIcon />} color="inherit">
							Ayuda
						</Button>
						<Button startIcon={<TermsIcon />} color="inherit">
							Términos
						</Button>
						<Button startIcon={<PrivacyIcon />} color="inherit">
							Privacidad
						</Button>
					</Stack>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: { xs: 'center', md: 'left' } }}>
						© 2024 TruequeYa. Todos los derechos reservados.
					</Typography>
				</Container>
			</Box>
		</Box>
	)
}

export default MarketplaceHome
