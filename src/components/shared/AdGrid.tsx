import React from 'react'
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Box,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material'
import {
	MoreVert as MoreVertIcon,
	Pause as PauseIcon,
	PlayArrow as PlayArrowIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
	Refresh as RefreshIcon,
} from '@mui/icons-material'

interface Ad {
	id: string
	title: string
	image: string
	price: string
	status: 'active' | 'paused' | 'sold'
}

interface AdGridProps {
	ads: Ad[]
	status: 'active' | 'paused' | 'sold'
	onPause?: (id: string) => void
	onActivate?: (id: string) => void
	onEdit?: (id: string) => void
	onDelete?: (id: string) => void
	onViewDetails?: (id: string) => void
	onRepublish?: (id: string) => void
}

const AdGrid: React.FC<AdGridProps> = ({
	ads,
	status,
	onPause,
	onActivate,
	onEdit,
	onDelete,
	onViewDetails,
	onRepublish,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [selectedAd, setSelectedAd] = React.useState<string | null>(null)

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, adId: string) => {
		setAnchorEl(event.currentTarget)
		setSelectedAd(adId)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		setSelectedAd(null)
	}

	const handleAction = (action: () => void) => {
		action()
		handleMenuClose()
	}

	const getActionButtons = (ad: Ad) => {
		switch (status) {
			case 'active':
				return (
					<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
						<Button
							size="small"
							variant="outlined"
							startIcon={<PauseIcon />}
							onClick={() => onPause?.(ad.id)}
						>
							Pausar
						</Button>
						<Button
							size="small"
							variant="outlined"
							startIcon={<EditIcon />}
							onClick={() => onEdit?.(ad.id)}
						>
							Editar
						</Button>
						<IconButton
							size="small"
							color="error"
							onClick={() => onDelete?.(ad.id)}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				)
			case 'paused':
				return (
					<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
						<Button
							size="small"
							variant="contained"
							startIcon={<PlayArrowIcon />}
							onClick={() => onActivate?.(ad.id)}
						>
							Reactivar
						</Button>
						<Button
							size="small"
							variant="outlined"
							startIcon={<EditIcon />}
							onClick={() => onEdit?.(ad.id)}
						>
							Editar
						</Button>
						<IconButton
							size="small"
							color="error"
							onClick={() => onDelete?.(ad.id)}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				)
			case 'sold':
				return (
					<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
						<Button
							size="small"
							variant="outlined"
							startIcon={<VisibilityIcon />}
							onClick={() => onViewDetails?.(ad.id)}
						>
							Ver detalles
						</Button>
						<Button
							size="small"
							variant="contained"
							startIcon={<RefreshIcon />}
							onClick={() => onRepublish?.(ad.id)}
						>
							Re-publicar
						</Button>
					</Box>
				)
			default:
				return null
		}
	}

	return (
		<Grid container spacing={3}>
			{ads.map((ad) => (
				<Grid item xs={12} sm={6} md={4} key={ad.id}>
					<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
						<CardMedia
							component="img"
							height="200"
							image={ad.image}
							alt={ad.title}
							sx={{ objectFit: 'cover' }}
						/>
						<CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
							<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
								{ad.title}
							</Typography>
							<Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mb: 2 }}>
								{ad.price}
							</Typography>
							{getActionButtons(ad)}
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}

export default AdGrid
