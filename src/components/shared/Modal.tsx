import React from 'react'
import { 
	Dialog, 
	DialogTitle, 
	DialogContent, 
	DialogActions, 
	IconButton,
	Typography,
	Box 
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

interface ModalProps {
	open: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	actions?: React.ReactNode
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	fullWidth?: boolean
}

const Modal: React.FC<ModalProps> = ({ 
	open, 
	onClose, 
	title, 
	children, 
	actions,
	maxWidth = 'sm',
	fullWidth = true
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			sx={{
				'& .MuiDialog-paper': {
					borderRadius: 3,
				},
			}}
		>
			<DialogTitle sx={{ 
				p: 3, 
				pb: 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<Typography variant="h6" sx={{ fontWeight: 600 }}>
					{title}
				</Typography>
				<IconButton
					onClick={onClose}
					sx={{
						color: 'grey.500',
						'&:hover': { color: 'grey.700' }
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			
			<DialogContent sx={{ p: 3, pt: 0 }}>
				{children}
			</DialogContent>
			
			{actions && (
				<DialogActions sx={{ p: 3, pt: 0 }}>
					{actions}
				</DialogActions>
			)}
		</Dialog>
	)
}

export default Modal
