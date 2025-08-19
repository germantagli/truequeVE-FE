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
	Typography,
	Toolbar,
	Breadcrumbs,
	Link,
	Rating,
	Avatar,
	Chip,
	Divider,
	Stack,
	useTheme,
	useMediaQuery,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material'
import {
	Home as HomeIcon,
	Category as CategoryIcon,
	Add as AddIcon,
	Person as PersonIcon,
	Notifications as NotificationsIcon,
	Search as SearchIcon,
	LocationOn as LocationIcon,
	Chat as ChatIcon,
	SwapHoriz as SwapIcon,
	Star as StarIcon,
	Help as HelpIcon,
	Description as TermsIcon,
	PrivacyTip as PrivacyIcon,
	ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'

// Datos de ejemplo de productos (simulando una base de datos)
const productsDatabase = {
	1: {
		id: 1,
		title: 'iPhone 12 Pro',
		price: '$800 USD',
		description: 'iPhone 12 Pro en excelente estado, 128GB, color azul pacífico. Incluye cargador original y funda protectora.',
		category: 'Electrónicos',
		condition: 'Usado - Excelente',
		paymentMethod: 'Transferencia, Pago Móvil, Efectivo',
		shipping: 'Entrega personal en Caracas',
		location: 'Caracas, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/00E676/FFFFFF?text=iPhone+12+Pro',
			'https://via.placeholder.com/200x150/00C853/FFFFFF?text=iPhone+1',
			'https://via.placeholder.com/200x150/4CAF50/FFFFFF?text=iPhone+2',
			'https://via.placeholder.com/200x150/81C784/FFFFFF?text=iPhone+3',
		],
		seller: {
			name: 'María G.',
			avatar: 'https://via.placeholder.com/60x60/00E676/FFFFFF?text=MG',
			rating: 4.9,
			sales: 150,
		},
		similarProducts: [
			{
				id: 2,
				title: 'Samsung Galaxy S21',
				price: '$700 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Galaxy+S21',
			},
			{
				id: 3,
				title: 'MacBook Air M1',
				price: '$1200 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=MacBook',
			},
			{
				id: 4,
				title: 'iPad Pro 11"',
				price: '$900 USD',
				image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=iPad',
			},
		],
	},
	2: {
		id: 2,
		title: 'Bicicleta de montaña',
		price: '$400 USD',
		description: 'Bicicleta de montaña profesional, marca Trek, modelo X-Caliber 8. Ideal para senderos y montaña.',
		category: 'Deportes',
		condition: 'Usado - Bueno',
		paymentMethod: 'Transferencia, Efectivo',
		shipping: 'Retiro en Valencia',
		location: 'Valencia, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/00E676/FFFFFF?text=Bicicleta',
			'https://via.placeholder.com/200x150/00C853/FFFFFF?text=Bici+1',
			'https://via.placeholder.com/200x150/4CAF50/FFFFFF?text=Bici+2',
		],
		seller: {
			name: 'Carlos R.',
			avatar: 'https://via.placeholder.com/60x60/00E676/FFFFFF?text=CR',
			rating: 4.7,
			sales: 89,
		},
		similarProducts: [
			{
				id: 5,
				title: 'Patines en línea',
				price: '$150 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Patines',
			},
			{
				id: 6,
				title: 'Raqueta de tenis',
				price: '$80 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Raqueta',
			},
		],
	},
}

function ProductDetail() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	
	const [selectedImage, setSelectedImage] = useState(0)
	
	// Obtener el producto por ID
	const product = productsDatabase[id as keyof typeof productsDatabase]
	
	if (!product) {
		return (
			<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
				<AppHeader />
				<Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
					<Typography variant="h4" gutterBottom>
						Producto no encontrado
					</Typography>
					<Button variant="contained" onClick={() => navigate('/')}>
						Volver al inicio
					</Button>
				</Container>
			</Box>
		)
	}

	const handleContactSeller = () => {
		navigate('/chat')
	}

	const handleSendMessage = () => {
		navigate('/chat')
	}

	const handleProposeTrade = () => {
		console.log('Proponer trueque')
	}

	const handleSimilarProductClick = (productId: number) => {
		navigate(`/product/${productId}`)
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />

			<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
				{/* Breadcrumbs */}
				<Breadcrumbs sx={{ mb: 3 }}>
					<Link color="inherit" href="/" underline="hover">
						Inicio
					</Link>
					<Link color="inherit" href="/search" underline="hover">
						{product.category}
					</Link>
					<Typography color="text.primary">{product.title}</Typography>
				</Breadcrumbs>

				<Grid container spacing={4}>
					{/* Galería de imágenes */}
					<Grid item xs={12} md={6}>
						<Box sx={{ mb: 2 }}>
							<CardMedia
								component="img"
								height="400"
								image={product.images[selectedImage]}
								alt={product.title}
								sx={{ borderRadius: 2, objectFit: 'cover' }}
							/>
						</Box>
						<Grid container spacing={1}>
							{product.images.map((image, index) => (
								<Grid item xs={3} key={index}>
									<CardMedia
										component="img"
										height="80"
										image={image}
										alt={`${product.title} ${index + 1}`}
										sx={{
											borderRadius: 1,
											cursor: 'pointer',
											border: selectedImage === index ? '2px solid' : '1px solid',
											borderColor: selectedImage === index ? 'primary.main' : 'divider',
											objectFit: 'cover',
										}}
										onClick={() => setSelectedImage(index)}
									/>
								</Grid>
							))}
						</Grid>
					</Grid>

					{/* Información del producto */}
					<Grid item xs={12} md={6}>
						<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
							{product.title}
						</Typography>

						<Typography variant="h5" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
							{product.price}
						</Typography>

						{/* Atributos del producto */}
						<Card sx={{ mb: 3, p: 2 }}>
							<TableContainer>
								<Table size="small">
									<TableBody>
										<TableRow>
											<TableCell sx={{ fontWeight: 600 }}>Categoría</TableCell>
											<TableCell>{product.category}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
											<TableCell>{product.condition}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell sx={{ fontWeight: 600 }}>Intercambio</TableCell>
											<TableCell>
												{product.acceptsTrade ? (
													<Chip label="Acepta trueque" color="success" size="small" />
												) : (
													<Chip label="Solo venta" color="default" size="small" />
												)}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell sx={{ fontWeight: 600 }}>Métodos de pago</TableCell>
											<TableCell>{product.paymentMethod}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell sx={{ fontWeight: 600 }}>Entrega</TableCell>
											<TableCell>{product.shipping}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Card>

						{/* Botones de acción */}
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
							<Button
								variant="contained"
								size="large"
								startIcon={<ChatIcon />}
								onClick={handleContactSeller}
								sx={{ 
									bgcolor: '#00E676',
									'&:hover': { bgcolor: '#00C853' },
									flex: { xs: 1, sm: 'none' }
								}}
							>
								Contactar vendedor
							</Button>
							<Button
								variant="outlined"
								size="large"
								startIcon={<ChatIcon />}
								onClick={handleSendMessage}
								sx={{ flex: { xs: 1, sm: 'none' } }}
							>
								Enviar mensaje
							</Button>
							{product.acceptsTrade && (
								<Button
									variant="outlined"
									size="large"
									startIcon={<SwapIcon />}
									onClick={handleProposeTrade}
									sx={{ flex: { xs: 1, sm: 'none' } }}
								>
									Proponer trueque
								</Button>
							)}
						</Stack>
					</Grid>
				</Grid>

				{/* Ubicación */}
				<Box sx={{ my: 4 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
						Ubicación
					</Typography>
					<Card sx={{ p: 2 }}>
						<Box
							sx={{
								height: 200,
								bgcolor: 'grey.200',
								borderRadius: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								mb: 2,
							}}
						>
							<LocationIcon sx={{ fontSize: 48, color: 'grey.500' }} />
						</Box>
						<Typography variant="body2" color="text.secondary">
							{product.location}
						</Typography>
					</Card>
				</Box>

				{/* Descripción */}
				<Box sx={{ mb: 4 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
						Descripción
					</Typography>
					<Card sx={{ p: 3 }}>
						<Typography variant="body1" sx={{ lineHeight: 1.6 }}>
							{product.description}
						</Typography>
					</Card>
				</Box>

				{/* Vendedor */}
				<Box sx={{ mb: 4 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
						Vendedor
					</Typography>
					<Card sx={{ p: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<Avatar src={product.seller.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
							<Box sx={{ flex: 1 }}>
								<Typography variant="h6" sx={{ fontWeight: 600 }}>
									{product.seller.name}
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Rating value={product.seller.rating} readOnly size="small" />
									<Typography variant="body2" color="text.secondary">
										({product.seller.sales} ventas)
									</Typography>
								</Box>
							</Box>
						</Box>
						<Button variant="outlined" startIcon={<PersonIcon />}>
							Ver perfil
						</Button>
					</Card>
				</Box>

				{/* Productos similares */}
				<Box sx={{ mb: 4 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
						Anuncios similares
					</Typography>
					<Grid container spacing={3}>
						{product.similarProducts.map((similarProduct) => (
							<Grid item xs={12} sm={6} md={4} key={similarProduct.id}>
								<Card
									sx={{
										cursor: 'pointer',
										'&:hover': {
											transform: 'translateY(-4px)',
											transition: 'transform 0.2s',
											boxShadow: 4,
										},
									}}
									onClick={() => handleSimilarProductClick(similarProduct.id)}
								>
									<CardMedia
										component="img"
										height="200"
										image={similarProduct.image}
										alt={similarProduct.title}
									/>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											{similarProduct.title}
										</Typography>
										<Typography variant="body2" color="primary.main" fontWeight={600}>
											{similarProduct.price}
										</Typography>
									</CardContent>
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

export default ProductDetail
