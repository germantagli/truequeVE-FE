import React, { useState } from 'react'
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	Alert,
	Chip,
	LinearProgress,
} from '@mui/material'
import { Upload as UploadIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import SectionHeader from './SectionHeader'

interface KycCardProps {
	onSave: (message: string, severity?: 'success' | 'error' | 'info') => void
}

const KycCard: React.FC<KycCardProps> = ({ onSave }) => {
	const [kycStatus, setKycStatus] = useState<'not-verified' | 'pending' | 'verified'>('not-verified')

	const getStatusInfo = () => {
		switch (kycStatus) {
			case 'verified':
				return {
					label: 'Verificado',
					color: 'success' as const,
					icon: <CheckCircleIcon />,
					description: 'Tu identidad ha sido verificada exitosamente',
				}
			case 'pending':
				return {
					label: 'En revisión',
					color: 'warning' as const,
					icon: null,
					description: 'Tu documento está siendo revisado por nuestro equipo',
				}
			default:
				return {
					label: 'No verificado',
					color: 'default' as const,
					icon: null,
					description: 'Completa la verificación para acceder a todas las funciones',
				}
		}
	}

	const handleUpload = () => {
		setKycStatus('pending')
		onSave('Documento subido correctamente. Está siendo revisado.')
	}

	const statusInfo = getStatusInfo()

	return (
		<Box>
			<SectionHeader
				title="Verificación de identidad"
				description="Verifica tu identidad para acceder a funciones avanzadas"
			/>

			<Card sx={{ mb: 3 }}>
				<CardContent>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
						<Typography variant="h6" sx={{ fontWeight: 600 }}>
							Estado de verificación
						</Typography>
						<Chip
							label={statusInfo.label}
							color={statusInfo.color}
							icon={statusInfo.icon}
						/>
					</Box>

					<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
						{statusInfo.description}
					</Typography>

					{kycStatus === 'pending' && (
						<Box sx={{ mb: 3 }}>
							<LinearProgress sx={{ mb: 1 }} />
							<Typography variant="caption" color="text.secondary">
								Revisión en progreso...
							</Typography>
						</Box>
					)}

					{kycStatus === 'not-verified' && (
						<Button
							variant="contained"
							startIcon={<UploadIcon />}
							onClick={handleUpload}
						>
							Subir documento
						</Button>
					)}
				</CardContent>
			</Card>

			<Alert severity="info" sx={{ mb: 3 }}>
				<strong>Documentos aceptados:</strong> Cédula de identidad, pasaporte o licencia de conducir
			</Alert>

			<Alert severity="warning">
				<strong>Importante:</strong> La verificación puede tomar hasta 24 horas hábiles
			</Alert>
		</Box>
	)
}

export default KycCard
