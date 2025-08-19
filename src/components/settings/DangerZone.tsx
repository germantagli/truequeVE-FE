import React, { useState } from 'react'
import {
	Box,
	Button,
	Typography,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Divider,
} from '@mui/material'
import { Logout as LogoutIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import SectionHeader from './SectionHeader'

interface DangerZoneProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const DangerZone: React.FC<DangerZoneProps> = ({ onSave }) => {
	const [deleteDialog, setDeleteDialog] = useState(false)
	const [deleteConfirmation, setDeleteConfirmation] = useState('')
	const navigate = useNavigate()

	const handleLogout = () => {
		onSave('Sesión cerrada correctamente')
		navigate('/login')
	}

	const handleDeleteAccount = () => {
		if (deleteConfirmation === 'ELIMINAR') {
			onSave('Cuenta eliminada correctamente')
			setDeleteDialog(false)
			setDeleteConfirmation('')
			navigate('/')
		} else {
			onSave('Debes escribir "ELIMINAR" para confirmar', 'error')
		}
	}

	return (
		<Box>
			<SectionHeader
				title="Cerrar sesión y eliminar cuenta"
				description="Acciones peligrosas que no se pueden deshacer"
			/>

			<Alert severity="error" sx={{ mb: 4 }}>
				<strong>Advertencia:</strong> Estas acciones son permanentes y no se pueden deshacer
			</Alert>

			{/* Cerrar sesión */}
			<Box sx={{ mb: 4 }}>
				<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
					Cerrar sesión
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					Cierra tu sesión actual en todos los dispositivos
				</Typography>
				<Button
					variant="outlined"
					startIcon={<LogoutIcon />}
					onClick={handleLogout}
				>
					Cerrar sesión
				</Button>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Eliminar cuenta */}
			<Box sx={{ mb: 4 }}>
				<Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
					Eliminar cuenta
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					Elimina permanentemente tu cuenta y todos los datos asociados
				</Typography>
				<Button
					variant="outlined"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={() => setDeleteDialog(true)}
				>
					Eliminar cuenta
				</Button>
			</Box>

			{/* Dialog de confirmación */}
			<Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} maxWidth="sm" fullWidth>
				<DialogTitle>Eliminar cuenta</DialogTitle>
				<DialogContent>
					<Alert severity="error" sx={{ mb: 3 }}>
						<strong>Esta acción es irreversible</strong>
						<br />
						Se eliminarán todos tus datos, anuncios, mensajes y configuraciones
					</Alert>

					<Typography variant="body2" sx={{ mb: 2 }}>
						Para confirmar, escribe <strong>"ELIMINAR"</strong> en el campo de abajo:
					</Typography>

					<TextField
						fullWidth
						label="Confirmar eliminación"
						value={deleteConfirmation}
						onChange={(e) => setDeleteConfirmation(e.target.value)}
						placeholder="ELIMINAR"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialog(false)}>
						Cancelar
					</Button>
					<Button
						onClick={handleDeleteAccount}
						variant="contained"
						color="error"
						disabled={deleteConfirmation !== 'ELIMINAR'}
					>
						Eliminar cuenta permanentemente
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default DangerZone
