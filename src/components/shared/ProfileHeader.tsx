import React from 'react'
import {
	Box,
	Avatar,
	Typography,
	Rating,
	Paper,
} from '@mui/material'

interface ProfileHeaderProps {
	name: string
	avatar?: string
	rating: number
	reviewCount: number
	bio: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	name,
	avatar,
	rating,
	reviewCount,
	bio,
}) => {
	return (
		<Paper sx={{ p: 4, mb: 3, textAlign: 'center' }}>
			<Avatar
				src={avatar}
				sx={{
					width: 120,
					height: 120,
					mx: 'auto',
					mb: 2,
					fontSize: '3rem',
					bgcolor: 'primary.main',
				}}
			>
				{name.charAt(0)}
			</Avatar>
			
			<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
				{name}
			</Typography>
			
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
				<Rating value={rating} precision={0.1} readOnly size="large" />
				<Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
					{rating} ({reviewCount} reseñas)
				</Typography>
			</Box>
			
			<Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
				{bio}
			</Typography>
		</Paper>
	)
}

export default ProfileHeader
