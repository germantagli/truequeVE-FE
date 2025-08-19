import React, { useState, useRef, useCallback } from 'react'
import {
	AppBar,
	Box,
	Button,
	Card,
	CardMedia,
	Container,
	Grid,
	IconButton,
	Typography,
	Toolbar,
	Breadcrumbs,
	Link,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Avatar,
	LinearProgress,
	Paper,
} from '@mui/material'
import {
	Home as HomeIcon,
	Search as SearchIcon,
	Chat as ChatIcon,
	Add as AddIcon,
	Person as PersonIcon,
	CloudUpload as CloudUploadIcon,
	Delete as DeleteIcon,
	AutoAwesome as AutoAwesomeIcon,
	NavigateNext as NavigateNextIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'

interface UploadedImage {
	id: string
	file: File
	preview: string
	uploadProgress?: number
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

function PublishStepOne() {
	const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
	const [dragActive, setDragActive] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedCategory, setSelectedCategory] = useState('')
	const [productTitle, setProductTitle] = useState('')
	const [productDescription, setProductDescription] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	const validateFile = (file: File): string | null => {
		// Validar tipo de archivo
		if (!file.type.startsWith('image/')) {
			return 'Solo se permiten archivos de imagen'
		}

		// Validar tamaño (8MB)
		const maxSize = 8 * 1024 * 1024 // 8MB en bytes
		if (file.size > maxSize) {
			return 'El archivo es demasiado grande. Máximo 8MB'
		}

		return null
	}

	const handleFiles = useCallback((files: FileList | File[]) => {
		setError(null)
		const fileArray = Array.from(files)

		// Validar número máximo de archivos
		if (uploadedImages.length + fileArray.length > 5) {
			setError('Máximo 5 imágenes permitidas')
			return
		}

		const validFiles: UploadedImage[] = []

		fileArray.forEach((file) => {
			const validationError = validateFile(file)
			if (validationError) {
				setError(validationError)
				return
			}

			const id = Math.random().toString(36).substr(2, 9)
			const preview = URL.createObjectURL(file)
			validFiles.push({ id, file, preview })
		})

		if (validFiles.length > 0) {
			setUploadedImages(prev => [...prev, ...validFiles])
			// Simular progreso de subida
			simulateUpload(validFiles)
		}
	}, [uploadedImages.length])

	const simulateUpload = (files: UploadedImage[]) => {
		setIsUploading(true)
		files.forEach((file, index) => {
			let progress = 0
			const interval = setInterval(() => {
				progress += Math.random() * 30
				if (progress >= 100) {
					progress = 100
					clearInterval(interval)
					if (index === files.length - 1) {
						setIsUploading(false)
					}
				}
				setUploadedImages(prev => 
					prev.map(img => 
						img.id === file.id 
							? { ...img, uploadProgress: progress }
							: img
					)
				)
			}, 200)
		})
	}

	const handleDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}, [])

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files)
		}
	}, [handleFiles])

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			handleFiles(event.target.files)
		}
	}

	const removeImage = (id: string) => {
		setUploadedImages(prev => {
			const image = prev.find(img => img.id === id)
			if (image) {
				URL.revokeObjectURL(image.preview)
			}
			return prev.filter(img => img.id !== id)
		})
	}

	const handleAISuggestion = () => {
		// Simular sugerencia de IA
		if (uploadedImages.length > 0) {
			const suggestions = [
				{ 
					category: 'Electrónica', 
					title: 'iPhone 12 Pro en excelente estado',
					description: 'iPhone 12 Pro en excelente estado, 128GB, color azul pacífico. Incluye cargador original y funda protectora. Solo 1 año de uso, sin rayones ni daños.'
				},
				{ 
					category: 'Hogar', 
					title: 'Mesa de escritorio de madera sólida',
					description: 'Mesa de escritorio de madera sólida, 120x60cm. Perfecta para home office o estudio. Incluye cajones organizadores y es muy resistente.'
				},
				{ 
					category: 'Deportes', 
					title: 'Bicicleta de montaña profesional',
					description: 'Bicicleta de montaña profesional, marca Trek, modelo X-Caliber 8. Ideal para senderos y montaña. Cambios Shimano, frenos hidráulicos.'
				},
			]
			const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
			setSelectedCategory(suggestion.category)
			setProductTitle(suggestion.title)
			setProductDescription(suggestion.description)
		}
	}

	const handleNext = () => {
		// Aquí irías al siguiente paso
		console.log('Siguiente paso:', { uploadedImages, selectedCategory, productTitle, productDescription })
		navigate('/publish/step2')
	}

	const handleSaveDraft = () => {
		// Guardar borrador
		console.log('Guardando borrador...')
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />

			{/* Main Content */}
			<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
				{/* Breadcrumb */}
				<Breadcrumbs sx={{ mb: 3 }}>
					<Link color="inherit" href="#" underline="hover">
						Publicar
					</Link>
					<Typography color="text.primary">Paso 1</Typography>
				</Breadcrumbs>

				{/* Title */}
				<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
					Sube fotos de tu producto
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
					Puedes subir hasta 5 fotos. Asegúrate de que sean claras y muestren el producto desde diferentes ángulos.
				</Typography>

				{/* Error Alert */}
				{error && (
					<Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
						{error}
					</Alert>
				)}

				{/* Upload Zone */}
				<Paper
					sx={{
						border: '2px dashed',
						borderColor: dragActive ? 'primary.main' : 'grey.300',
						borderRadius: 3,
						p: 6,
						textAlign: 'center',
						bgcolor: dragActive ? 'primary.50' : 'background.paper',
						cursor: 'pointer',
						transition: 'all 0.2s',
						'&:hover': {
							borderColor: 'primary.main',
							bgcolor: 'primary.50',
						},
						mb: 4,
					}}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					onClick={() => fileInputRef.current?.click()}
				>
					<CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
					<Typography variant="h6" gutterBottom>
						Arrastra y suelta tus fotos aquí
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
						o haz clic para seleccionar archivos
					</Typography>
					<Button 
						variant="outlined" 
						onClick={(e) => {
							e.stopPropagation()
							fileInputRef.current?.click()
						}}
						disabled={uploadedImages.length >= 5}
					>
						Seleccionar fotos
					</Button>
					<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
						{uploadedImages.length} / 5 fotos
					</Typography>
				</Paper>

				{/* Hidden file input */}
				<input
					ref={fileInputRef}
					type="file"
					multiple
					accept="image/*"
					onChange={handleFileSelect}
					style={{ display: 'none' }}
					disabled={uploadedImages.length >= 5}
				/>

				{/* Image Previews */}
				{uploadedImages.length > 0 && (
					<Box sx={{ mb: 4 }}>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
							Vista previa de las fotos
						</Typography>
						<Grid container spacing={2}>
							{uploadedImages.map((image) => (
								<Grid item xs={6} sm={4} md={3} key={image.id}>
									<Card sx={{ position: 'relative', borderRadius: 2 }}>
										<CardMedia
											component="img"
											height={200}
											image={image.preview}
											alt="Preview"
											sx={{ objectFit: 'cover' }}
										/>
										{image.uploadProgress !== undefined && image.uploadProgress < 100 && (
											<Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
												<LinearProgress 
													variant="determinate" 
													value={image.uploadProgress} 
													sx={{ height: 4 }}
												/>
											</Box>
										)}
										<IconButton
											sx={{
												position: 'absolute',
												top: 8,
												right: 8,
												bgcolor: 'rgba(0,0,0,0.5)',
												color: 'white',
												'&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
											}}
											onClick={() => removeImage(image.id)}
										>
											<DeleteIcon />
										</IconButton>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				)}

				{/* AI Suggestions */}
				<Box sx={{ mb: 4 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
						<AutoAwesomeIcon color="primary" />
						Sugerencias de la IA
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<InputLabel>Categoría</InputLabel>
								<Select
									value={selectedCategory}
									label="Categoría"
									onChange={(e) => setSelectedCategory(e.target.value)}
								>
									{categories.map((category) => (
										<MenuItem key={category} value={category}>
											{category}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label="Título del producto"
								value={productTitle}
								onChange={(e) => setProductTitle(e.target.value)}
								placeholder="Ej: iPhone 12 Pro en excelente estado"
							/>
						</Grid>
					</Grid>
					<Button
						variant="outlined"
						startIcon={<AutoAwesomeIcon />}
						onClick={handleAISuggestion}
						sx={{ mt: 2 }}
						disabled={uploadedImages.length === 0}
					>
						Sugerir con IA
					</Button>
				</Box>

				{/* Action Buttons */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Button variant="outlined" onClick={handleSaveDraft}>
						Guardar borrador
					</Button>
					<Button
						variant="contained"
						endIcon={<NavigateNextIcon />}
						onClick={handleNext}
						disabled={uploadedImages.length === 0}
						sx={{
							bgcolor: '#00E676',
							color: 'white',
							px: 4,
							py: 1.5,
							'&:hover': { bgcolor: '#00C853' },
							'&:disabled': { bgcolor: 'grey.300' }
						}}
					>
						Siguiente
					</Button>
				</Box>
			</Container>
			<Footer />
		</Box>
	)
}

export default PublishStepOne
