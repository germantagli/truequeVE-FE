import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingProps {
	message?: string
	size?: number
	fullScreen?: boolean
}

const Loading: React.FC<LoadingProps> = ({ 
	message = 'Cargando...', 
	size = 40,
	fullScreen = false 
}) => {
	const content = (
		<Box sx={{ 
			display: 'flex', 
			flexDirection: 'column', 
			alignItems: 'center', 
			gap: 2 
		}}>
			<CircularProgress size={size} sx={{ color: 'primary.main' }} />
			{message && (
				<Typography variant="body2" color="text.secondary">
					{message}
				</Typography>
			)}
		</Box>
	)

	if (fullScreen) {
		return (
			<Box sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'rgba(255,255,255,0.9)',
				zIndex: 9999,
			}}>
				{content}
			</Box>
		)
	}

	return content
}

export default Loading
