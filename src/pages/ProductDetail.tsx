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
		shipping: 'Entrega personal en Valencia',
		location: 'Valencia, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=Bicicleta+MTB',
			'https://via.placeholder.com/200x150/FF5722/FFFFFF?text=Bici+1',
			'https://via.placeholder.com/200x150/F57C00/FFFFFF?text=Bici+2',
			'https://via.placeholder.com/200x150/FF9800/FFFFFF?text=Bici+3',
		],
		seller: {
			name: 'Carlos R.',
			avatar: 'https://via.placeholder.com/60x60/FF6B35/FFFFFF?text=CR',
			rating: 4.7,
			sales: 89,
		},
		similarProducts: [
			{
				id: 3,
				title: 'Patineta eléctrica',
				price: '$300 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Patineta',
			},
			{
				id: 4,
				title: 'Casco de ciclismo',
				price: '$80 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Casco',
			},
			{
				id: 5,
				title: 'Zapatillas deportivas',
				price: '$120 USD',
				image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=Zapatillas',
			},
		],
	},
	3: {
		id: 3,
		title: 'Guitarra acústica',
		price: '$250 USD',
		description: 'Guitarra acústica Yamaha FG800, sonido cristalino y madera de calidad. Perfecta para principiantes y avanzados.',
		category: 'Instrumentos',
		condition: 'Usado - Excelente',
		paymentMethod: 'Transferencia, Pago Móvil, Efectivo',
		shipping: 'Entrega personal en Maracaibo',
		location: 'Maracaibo, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/2E7CF6/FFFFFF?text=Guitarra+Acústica',
			'https://via.placeholder.com/200x150/1976D2/FFFFFF?text=Guitarra+1',
			'https://via.placeholder.com/200x150/1565C0/FFFFFF?text=Guitarra+2',
			'https://via.placeholder.com/200x150/0D47A1/FFFFFF?text=Guitarra+3',
		],
		seller: {
			name: 'Ana M.',
			avatar: 'https://via.placeholder.com/60x60/2E7CF6/FFFFFF?text=AM',
			rating: 4.8,
			sales: 234,
		},
		similarProducts: [
			{
				id: 4,
				title: 'Teclado digital',
				price: '$180 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Teclado',
			},
			{
				id: 5,
				title: 'Micrófono de estudio',
				price: '$120 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Micrófono',
			},
			{
				id: 6,
				title: 'Amplificador de guitarra',
				price: '$200 USD',
				image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=Amplificador',
			},
		],
	},
	4: {
		id: 4,
		title: 'Laptop Dell Inspiron',
		price: '$600 USD',
		description: 'Laptop Dell Inspiron 15 3000, Intel i5, 8GB RAM, 256GB SSD. Ideal para trabajo y estudios.',
		category: 'Electrónicos',
		condition: 'Usado - Bueno',
		paymentMethod: 'Transferencia, Pago Móvil',
		shipping: 'Entrega personal en Caracas',
		location: 'Caracas, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/00E676/FFFFFF?text=Laptop+Dell',
			'https://via.placeholder.com/200x150/00C853/FFFFFF?text=Laptop+1',
			'https://via.placeholder.com/200x150/4CAF50/FFFFFF?text=Laptop+2',
			'https://via.placeholder.com/200x150/81C784/FFFFFF?text=Laptop+3',
		],
		seller: {
			name: 'Luis P.',
			avatar: 'https://via.placeholder.com/60x60/00E676/FFFFFF?text=LP',
			rating: 4.6,
			sales: 67,
		},
		similarProducts: [
			{
				id: 1,
				title: 'iPhone 12 Pro',
				price: '$800 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPhone+12+Pro',
			},
			{
				id: 5,
				title: 'Monitor LG 24"',
				price: '$150 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Monitor',
			},
			{
				id: 6,
				title: 'Teclado mecánico',
				price: '$80 USD',
				image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=Teclado',
			},
		],
	},
	5: {
		id: 5,
		title: 'Cámara Canon EOS',
		price: '$450 USD',
		description: 'Cámara Canon EOS Rebel T7 con lente 18-55mm. Perfecta para fotografía amateur y profesional.',
		category: 'Electrónicos',
		condition: 'Usado - Excelente',
		paymentMethod: 'Transferencia, Efectivo',
		shipping: 'Entrega personal en Barquisimeto',
		location: 'Barquisimeto, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=Cámara+Canon',
			'https://via.placeholder.com/200x150/FF5722/FFFFFF?text=Cámara+1',
			'https://via.placeholder.com/200x150/F57C00/FFFFFF?text=Cámara+2',
			'https://via.placeholder.com/200x150/FF9800/FFFFFF?text=Cámara+3',
		],
		seller: {
			name: 'Roberto S.',
			avatar: 'https://via.placeholder.com/60x60/FF6B35/FFFFFF?text=RS',
			rating: 4.9,
			sales: 156,
		},
		similarProducts: [
			{
				id: 1,
				title: 'iPhone 12 Pro',
				price: '$800 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPhone+12+Pro',
			},
			{
				id: 3,
				title: 'Guitarra acústica',
				price: '$250 USD',
				image: 'https://via.placeholder.com/300x200/2E7CF6/FFFFFF?text=Guitarra',
			},
			{
				id: 6,
				title: 'Tripode profesional',
				price: '$90 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Tripode',
			},
		],
	},
	6: {
		id: 6,
		title: 'Mesa de escritorio',
		price: '$180 USD',
		description: 'Mesa de escritorio de madera sólida, 120x60cm. Perfecta para home office o estudio.',
		category: 'Hogar',
		condition: 'Usado - Bueno',
		paymentMethod: 'Transferencia, Efectivo',
		shipping: 'Entrega personal en Caracas',
		location: 'Caracas, Venezuela',
		acceptsTrade: true,
		images: [
			'https://via.placeholder.com/600x400/2E7CF6/FFFFFF?text=Mesa+Escritorio',
			'https://via.placeholder.com/200x150/1976D2/FFFFFF?text=Mesa+1',
			'https://via.placeholder.com/200x150/1565C0/FFFFFF?text=Mesa+2',
			'https://via.placeholder.com/200x150/0D47A1/FFFFFF?text=Mesa+3',
		],
		seller: {
			name: 'Carmen L.',
			avatar: 'https://via.placeholder.com/60x60/2E7CF6/FFFFFF?text=CL',
			rating: 4.7,
			sales: 98,
		},
		similarProducts: [
			{
				id: 4,
				title: 'Laptop Dell Inspiron',
				price: '$600 USD',
				image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=Laptop+Dell',
			},
			{
				id: 5,
				title: 'Cámara Canon EOS',
				price: '$450 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Cámara+Canon',
			},
			{
				id: 2,
				title: 'Bicicleta de montaña',
				price: '$400 USD',
				image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Bicicleta',
			},
		],
	},
}

function ProductDetail() {
	const [selectedImage, setSelectedImage] = useState(0)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()

	// Obtener datos del producto basado en el ID de la URL
	const productData = productsDatabase[Number(id)] || productsDatabase[1] // Fallback al producto 1

	const handleImageClick = (index: number) => {
		setSelectedImage(index)
	}

	const handleContactSeller = () => {
		// Redirigir al chat
		navigate('/chat')
	}

	const handleSendMessage = () => {
		// Redirigir al chat
		navigate('/chat')
	}

	const handleProposeTrade = () => {
		// Implementar lógica de trueque
		console.log('Proponer trueque')
	}

	const handleSimilarProductClick = (productId: number) => {
		navigate(`/product/${productId}`)
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Toolbar>
					<Typography 
						variant="h6" 
						sx={{ fontWeight: 700, color: 'primary.main', flexGrow: 1, cursor: 'pointer' }}
						onClick={() => navigate('/')}
					>
						TruequeYa
					</Typography>

					{/* Desktop Navigation */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
						<Button 
							startIcon={<HomeIcon />} 
							color="inherit"
							onClick={() => navigate('/')}
						>
							Inicio
						</Button>
						<Button startIcon={<CategoryIcon />} color="inherit">
							Categorías
						</Button>
						<Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: 'primary.main' }}>
							Publicar
						</Button>
						<IconButton color="inherit">
							<NotificationsIcon />
						</IconButton>
						<IconButton 
							color="inherit" 
							sx={{ 
								bgcolor: 'primary.main', 
								color: 'white',
								'&:hover': { bgcolor: 'primary.dark' }
							}}
						>
							<PersonIcon />
						</IconButton>
					</Box>

					{/* Mobile Menu Button */}
					<IconButton
						sx={{ display: { xs: 'flex', md: 'none' } }}
						color="inherit"
					>
						<SearchIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Main Content */}
			<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
				{/* Breadcrumbs */}
				<Breadcrumbs sx={{ mb: 3 }}>
					<Link color="inherit" href="#" underline="hover">
						{productData.category}
					</Link>
					<Typography color="text.primary">{productData.title}</Typography>
				</Breadcrumbs>

				<Grid container spacing={4}>
					{/* Galería de imágenes */}
					<Grid item xs={12} md={6}>
						<Box sx={{ mb: 2 }}>
							<Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
								<CardMedia
									component="img"
									height={isMobile ? 300 : 400}
									image={productData.images[selectedImage]}
									alt={productData.title}
									sx={{ objectFit: 'cover' }}
								/>
							</Card>
						</Box>
						
						{/* Miniaturas */}
						<Grid container spacing={1}>
							{productData.images.map((image, index) => (
								<Grid item xs={3} sm={2} key={index}>
									<Card 
										sx={{ 
											cursor: 'pointer',
											border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none',
											borderRadius: 1,
											overflow: 'hidden'
										}}
										onClick={() => handleImageClick(index)}
									>
										<CardMedia
											component="img"
											height={80}
											image={image}
											alt={`Imagen ${index + 1}`}
											sx={{ objectFit: 'cover' }}
										/>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>

					{/* Información del producto */}
					<Grid item xs={12} md={6}>
						<Stack spacing={3}>
							{/* Título y precio */}
							<Box>
								<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
									{productData.title}
								</Typography>
								<Typography variant="h5" color="primary.main" sx={{ fontWeight: 700, mb: 2 }}>
									{productData.price}
								</Typography>
								
								{/* Opciones de trueque */}
								<Stack direction="row" spacing={1}>
									<Chip 
										label="Aceptamos trueque" 
										color={productData.acceptsTrade ? "primary" : "default"}
										variant={productData.acceptsTrade ? "filled" : "outlined"}
									/>
									<Chip 
										label="Descartado" 
										variant="outlined"
										color="default"
									/>
								</Stack>
							</Box>

							{/* Atributos */}
							<Card sx={{ borderRadius: 2, p: 2 }}>
								<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
									Atributos
								</Typography>
								<TableContainer>
									<Table size="small">
										<TableBody>
											<TableRow>
												<TableCell sx={{ fontWeight: 600, border: 'none', py: 1 }}>Categoría:</TableCell>
												<TableCell sx={{ border: 'none', py: 1 }}>{productData.category}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={{ fontWeight: 600, border: 'none', py: 1 }}>Condición:</TableCell>
												<TableCell sx={{ border: 'none', py: 1 }}>{productData.condition}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={{ fontWeight: 600, border: 'none', py: 1 }}>Método de Pago:</TableCell>
												<TableCell sx={{ border: 'none', py: 1 }}>{productData.paymentMethod}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell sx={{ fontWeight: 600, border: 'none', py: 1 }}>Envío:</TableCell>
												<TableCell sx={{ border: 'none', py: 1 }}>{productData.shipping}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Card>

							{/* Botones de acción */}
							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
								<Button
									variant="contained"
									fullWidth={isMobile}
									startIcon={<ChatIcon />}
									onClick={handleContactSeller}
									sx={{
										bgcolor: '#00E676',
										color: 'white',
										py: 1.5,
										fontWeight: 600,
										'&:hover': { bgcolor: '#00C853' }
									}}
								>
									Chatear
								</Button>
								<Button
									variant="outlined"
									fullWidth={isMobile}
									startIcon={<SwapIcon />}
									onClick={handleProposeTrade}
									sx={{
										borderColor: 'grey.300',
										color: 'grey.700',
										py: 1.5,
										'&:hover': {
											borderColor: 'grey.400',
											bgcolor: 'grey.50'
										}
									}}
								>
									Proponer trueque
								</Button>
							</Stack>
						</Stack>
					</Grid>
				</Grid>

				{/* Ubicación */}
				<Box sx={{ mt: 6 }}>
					<Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Ubicación
					</Typography>
					<Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
						<Box
							sx={{
								height: 300,
								backgroundImage: 'url(https://via.placeholder.com/800x300/4CAF50/FFFFFF?text=Mapa+de+Caracas)',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative'
							}}
						>
							<Box sx={{ 
								bgcolor: 'rgba(255,255,255,0.9)', 
								p: 2, 
								borderRadius: 2,
								textAlign: 'center'
							}}>
								<LocationIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
								<Typography variant="h6" sx={{ fontWeight: 600 }}>
									{productData.location}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Centro Comercial Ciudad Tamanaco
								</Typography>
							</Box>
						</Box>
					</Card>
				</Box>

				{/* Descripción */}
				<Box sx={{ mt: 6 }}>
					<Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Descripción
					</Typography>
					<Card sx={{ borderRadius: 2, p: 3 }}>
						<Typography variant="body1" sx={{ lineHeight: 1.7 }}>
							{productData.description}
						</Typography>
					</Card>
				</Box>

				{/* Vendedor */}
				<Box sx={{ mt: 6 }}>
					<Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Vendedor
					</Typography>
					<Card sx={{ borderRadius: 2, p: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<Avatar 
									src={productData.seller.avatar} 
									sx={{ width: 60, height: 60 }}
								/>
								<Box>
									<Typography variant="h6" sx={{ fontWeight: 600 }}>
										{productData.seller.name}
									</Typography>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
										<Rating value={productData.seller.rating} readOnly size="small" />
										<Typography variant="body2" color="text.secondary">
											{productData.seller.rating} ({productData.seller.sales} ventas)
										</Typography>
									</Box>
								</Box>
							</Box>
							<Button variant="outlined" size="small">
								Ver perfil
							</Button>
						</Box>
					</Card>
				</Box>

				{/* Anuncios similares */}
				<Box sx={{ mt: 6 }}>
					<Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Anuncios similares
					</Typography>
					<Grid container spacing={3}>
						{productData.similarProducts.map((product) => (
							<Grid item xs={12} sm={6} md={4} key={product.id}>
								<Card sx={{ 
									borderRadius: 2, 
									overflow: 'hidden',
									cursor: 'pointer',
									'&:hover': { 
										transform: 'translateY(-4px)', 
										transition: 'transform 0.2s',
										boxShadow: 4
									}
								}}
								onClick={() => handleSimilarProductClick(product.id)}
								>
									<CardMedia
										component="img"
										height={200}
										image={product.image}
										alt={product.title}
										sx={{ objectFit: 'cover' }}
									/>
									<CardContent>
										<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
											{product.title}
										</Typography>
										<Typography variant="body1" color="primary.main" sx={{ fontWeight: 600 }}>
											{product.price}
										</Typography>
									</CardContent>
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
					mt: 'auto',
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

export default ProductDetail
