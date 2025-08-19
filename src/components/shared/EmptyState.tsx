import React from 'react'
import { Box, Typography, Button, CardMedia } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

interface EmptyStateProps {
	title?: string
	subtitle?: string
	imageSrc?: string
	buttonText?: string
	onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = 'No se encontraron resultados',
	subtitle = 'Intenta ajustar tus filtros o buscar con diferentes palabras clave.',
	imageSrc,
	buttonText = 'Explorar anuncios',
	onAction
}) => {
	return (
		<Box
			sx={{
				textAlign: 'center',
				py: 8,
				px: 2,
			}}
		>
			{imageSrc ? (
				<CardMedia
					component="img"
					image={imageSrc}
					alt="Empty state"
					sx={{
						width: 200,
						height: 200,
						mx: 'auto',
						mb: 3,
						opacity: 0.6,
					}}
				/>
			) : (
				<SearchIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
			)}
			
			<Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
				{title}
			</Typography>
			
			<Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
				{subtitle}
			</Typography>
			
			{onAction && (
				<Button
					variant="contained"
					size="large"
					onClick={onAction}
					startIcon={<SearchIcon />}
				>
					{buttonText}
				</Button>
			)}
		</Box>
	)
}

export default EmptyState
