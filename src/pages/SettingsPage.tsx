import React, { useState, useEffect } from 'react'
import {
	Box,
	Container,
	Typography,
	Paper,
	useMediaQuery,
	useTheme,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	FormControl,
	Select,
	MenuItem,
	Snackbar,
	Alert,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'
import SidebarNav from '../components/settings/SidebarNav'
import SectionHeader from '../components/settings/SectionHeader'
import PersonalForm from '../components/settings/PersonalForm'
import ShippingForm from '../components/settings/ShippingForm'
import BillingForm from '../components/settings/BillingForm'
import PaymentsForm from '../components/settings/PaymentsForm'
import SecurityForm from '../components/settings/SecurityForm'
import EmailNotificationsForm from '../components/settings/EmailNotificationsForm'
import PrivacyForm from '../components/settings/PrivacyForm'
import LocaleThemeForm from '../components/settings/LocaleThemeForm'
import KycCard from '../components/settings/KycCard'
import DangerZone from '../components/settings/DangerZone'

type Section = 
	| 'personal'
	| 'shipping'
	| 'billing'
	| 'payments'
	| 'security'
	| 'email'
	| 'privacy'
	| 'locale'
	| 'kyc'
	| 'danger'

function SettingsPage() {
	const { t } = useTranslation()
	
	const sections = [
		{ id: 'personal', label: t('settings.sections.personal'), icon: '👤' },
		{ id: 'shipping', label: t('settings.sections.shipping'), icon: '📍' },
		{ id: 'billing', label: t('settings.sections.billing'), icon: '🧾' },
		{ id: 'payments', label: t('settings.sections.payments'), icon: '💳' },
		{ id: 'security', label: t('settings.sections.security'), icon: '🔒' },
		{ id: 'email', label: t('settings.sections.email'), icon: '📧' },
		{ id: 'privacy', label: t('settings.sections.privacy'), icon: '🔐' },
		{ id: 'locale', label: t('settings.sections.locale'), icon: '🌐' },
		{ id: 'kyc', label: t('settings.sections.kyc'), icon: '✅' },
		{ id: 'danger', label: t('settings.sections.danger'), icon: '⚠️' },
	]
	const [selectedSection, setSelectedSection] = useState<Section>('personal')
	const [loading, setLoading] = useState(true)
	const [snackbar, setSnackbar] = useState<{
		open: boolean
		message: string
		severity: 'success' | 'error' | 'info'
	}>({
		open: false,
		message: '',
		severity: 'success'
	})
	
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const navigate = useNavigate()

	useEffect(() => {
		// Simular carga inicial
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	const handleSectionChange = (section: Section) => {
		setSelectedSection(section)
	}

	const handleSnackbarClose = () => {
		setSnackbar(prev => ({ ...prev, open: false }))
	}

	const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'success') => {
		setSnackbar({
			open: true,
			message,
			severity
		})
	}

	const renderSection = () => {
		switch (selectedSection) {
			case 'personal':
				return <PersonalForm onSave={showSnackbar} />
			case 'shipping':
				return <ShippingForm onSave={showSnackbar} />
			case 'billing':
				return <BillingForm onSave={showSnackbar} />
			case 'payments':
				return <PaymentsForm onSave={showSnackbar} />
			case 'security':
				return <SecurityForm onSave={showSnackbar} />
			case 'email':
				return <EmailNotificationsForm onSave={showSnackbar} />
			case 'privacy':
				return <PrivacyForm onSave={showSnackbar} />
			case 'locale':
				return <LocaleThemeForm onSave={showSnackbar} />
			case 'kyc':
				return <KycCard onSave={showSnackbar} />
			case 'danger':
				return <DangerZone onSave={showSnackbar} />
			default:
				return <PersonalForm onSave={showSnackbar} />
		}
	}

	if (loading) {
		return (
			<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
				<AppHeader />
				<Container maxWidth="lg" sx={{ py: 4, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography>Cargando configuración...</Typography>
				</Container>
				<Footer />
			</Box>
		)
	}

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />
			
			<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
				<Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
					Configuración
				</Typography>

				{isMobile ? (
					// Mobile layout
					<Box>
						<FormControl fullWidth sx={{ mb: 3 }}>
							<Select
								value={selectedSection}
								onChange={(e) => handleSectionChange(e.target.value as Section)}
							>
								{sections.map((section) => (
									<MenuItem key={section.id} value={section.id}>
										{section.icon} {section.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						
						<Paper sx={{ p: 3 }}>
							{renderSection()}
						</Paper>
					</Box>
				) : (
					// Desktop layout
					<Box sx={{ display: 'flex', gap: 3 }}>
						{/* Sidebar */}
						<Box sx={{ width: 280, flexShrink: 0 }}>
							<SidebarNav
								sections={sections}
								selectedSection={selectedSection}
								onSectionChange={handleSectionChange}
							/>
						</Box>
						
						{/* Content */}
						<Box sx={{ flex: 1 }}>
							<Paper sx={{ p: 4 }}>
								{renderSection()}
							</Paper>
						</Box>
					</Box>
				)}
			</Container>

			<Footer />

			{/* Snackbar for notifications */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default SettingsPage
