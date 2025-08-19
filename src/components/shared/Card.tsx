import React from 'react'
import { Card as MuiCard, CardProps, CardContent, CardMedia, CardActions } from '@mui/material'

interface CustomCardProps extends CardProps {
	image?: string
	title?: string
	subtitle?: string
	actions?: React.ReactNode
	imageHeight?: number | string
}

const Card: React.FC<CustomCardProps> = ({ 
	children, 
	image, 
	title, 
	subtitle, 
	actions,
	imageHeight = 200,
	...props 
}) => {
	return (
		<MuiCard
			sx={{
				borderRadius: 3,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
					transform: 'translateY(-2px)',
				},
			}}
			{...props}
		>
			{image && (
				<CardMedia
					component="img"
					height={imageHeight}
					image={image}
					alt={title || 'Card image'}
					sx={{ objectFit: 'cover' }}
				/>
			)}
			{(title || subtitle || children) && (
				<CardContent sx={{ p: 3 }}>
					{title && (
						<h3 style={{ 
							margin: '0 0 8px 0', 
							fontSize: '1.25rem', 
							fontWeight: 600,
							color: '#333'
						}}>
							{title}
						</h3>
					)}
					{subtitle && (
						<p style={{ 
							margin: '0 0 16px 0', 
							color: '#666',
							fontSize: '0.875rem'
						}}>
							{subtitle}
						</p>
					)}
					{children}
				</CardContent>
			)}
			{actions && (
				<CardActions sx={{ p: 3, pt: 0 }}>
					{actions}
				</CardActions>
			)}
		</MuiCard>
	)
}

export default Card
