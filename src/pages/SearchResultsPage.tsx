import React, { useState } from 'react'
import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	TextField,
	Typography,
	Avatar,
	InputAdornment,
	Chip,
	Drawer,
	Fab,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import {
	Search as SearchIcon,
	FilterList as FilterIcon,
} from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppHeader from '../components/shared/AppHeader'
import FiltersPanel from '../components/shared/FiltersPanel'
import EmptyState from '../components/shared/EmptyState'
import Footer from '../components/shared/Footer'

// Mock data para resultados
const mockResults = [
	{
		id: 1,
		title: 'iPhone 13 Pro',
		price: '$800',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=iPhone+13+Pro',
		location: 'Caracas',
		category: 'Electrónica',
	},
	{
		id: 2,
		title: 'MacBook Air M1',
		price: '$1200',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=MacBook+Air',
		location: 'Valencia',
		category: 'Electrónica',
	},
	{
		id: 3,
		title: 'PlayStation 5',
		price: '$500',
		image: 'https://via.placeholder.com/300x200/00E676/FFFFFF?text=PS5',
		location: 'Maracaibo',
		category: 'Juegos',
	},
]

function SearchResultsPage() {
	const [searchParams] = useSearchParams()
	const [results, setResults] = useState(mockResults)
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()

	const handleSearch = () => {
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
		}
	}

	const handleFiltersApply = (filters: any) => {
		console.log('Aplicando filtros:', filters)
		// Aquí se aplicarían los filtros a los resultados
		setFiltersOpen(false)
	}

	const handleFiltersClear = () => {
		console.log('Limpiando filtros')
		setResults(mockResults)
		setFiltersOpen(false)
	}

	const handleProductClick = (productId: number) => {
		navigate(`/product/${productId}`)
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />

			<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
				{/* Título y búsqueda */}
				<Box sx={{ mb: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
						Resultados de búsqueda
					</Typography>

					{/* Barra de búsqueda */}
					<Box sx={{ mb: 3 }}>
						<TextField
							fullWidth
							placeholder="Buscar productos..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleSearch}>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{ maxWidth: 600, mx: 'auto', display: 'block' }}
						/>
					</Box>

					{/* Ordenar por */}
					<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
						<Chip label="Relevancia" variant="filled" color="primary" />
						<Chip label="Recientes" variant="outlined" />
						<Chip label="Precio" variant="outlined" />
						<Chip label="Cercanía" variant="outlined" />
					</Box>
				</Box>

				{/* Layout principal */}
				<Grid container spacing={3}>
					{/* Sidebar de filtros - Desktop */}
					{!isMobile && (
						<Grid item xs={12} md={3}>
							<FiltersPanel
								onApply={handleFiltersApply}
								onClear={handleFiltersClear}
								initialFilters={{}}
							/>
						</Grid>
					)}

					{/* Contenido principal */}
					<Grid item xs={12} md={isMobile ? 12 : 9}>
						{results.length === 0 ? (
							<EmptyState
								title="No se encontraron resultados"
								subtitle="Intenta ajustar tus filtros o buscar con diferentes palabras clave."
								buttonText="Limpiar filtros"
								onAction={handleFiltersClear}
							/>
						) : (
							<Grid container spacing={3}>
								{results.map((item) => (
									<Grid item xs={12} sm={6} md={4} key={item.id}>
										<Box
											sx={{
												border: '1px solid',
												borderColor: 'divider',
												borderRadius: 2,
												overflow: 'hidden',
												cursor: 'pointer',
												'&:hover': {
													boxShadow: 2,
													transform: 'translateY(-2px)',
													transition: 'all 0.2s',
												},
											}}
											onClick={() => handleProductClick(item.id)}
										>
											<Box
												component="img"
												src={item.image}
												alt={item.title}
												sx={{
													width: '100%',
													height: 200,
													objectFit: 'cover',
												}}
											/>
											<Box sx={{ p: 2 }}>
												<Typography variant="h6" gutterBottom>
													{item.title}
												</Typography>
												<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
													{item.category} • {item.location}
												</Typography>
												<Typography variant="h6" color="primary.main" fontWeight={600}>
													{item.price}
												</Typography>
											</Box>
										</Box>
									</Grid>
								))}
							</Grid>
						)}
					</Grid>
				</Grid>

				{/* Botón de filtros para mobile */}
				{isMobile && (
					<Fab
						color="primary"
						aria-label="filtros"
						sx={{ position: 'fixed', bottom: 16, right: 16 }}
						onClick={() => setFiltersOpen(true)}
					>
						<FilterIcon />
					</Fab>
				)}

				{/* Drawer de filtros para mobile */}
				<Drawer
					anchor="right"
					open={filtersOpen}
					onClose={() => setFiltersOpen(false)}
					sx={{ display: { xs: 'block', md: 'none' } }}
				>
					<Box sx={{ width: 300, p: 2 }}>
						<FiltersPanel
							onApply={handleFiltersApply}
							onClear={handleFiltersClear}
							initialFilters={{}}
						/>
					</Box>
				</Drawer>
			</Container>

			<Footer />
		</Box>
	)
}

export default SearchResultsPage
