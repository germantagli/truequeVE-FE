import React from 'react'
import { Typography, Box } from '@mui/material'

interface SectionHeaderProps {
	title: string
	description: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
	return (
		<Box sx={{ mb: 4 }}>
			<Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
				{title}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{description}
			</Typography>
		</Box>
	)
}

export default SectionHeader
