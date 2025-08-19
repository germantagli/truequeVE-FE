import React from 'react'
import {
	Box,
	Button,
	Card,
	CardContent,
	Typography,
	Container,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Chip,
	useTheme,
} from '@mui/material'
import {
	Check as CheckIcon,
	Star as StarIcon,
	Visibility as VisibilityIcon,
	Badge as BadgeIcon,
	Schedule as ScheduleIcon,
	TrendingUp as TrendingUpIcon,
	Discount as DiscountIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/shared/AppHeader'
import Footer from '../components/shared/Footer'

interface Plan {
	id: string
	name: string
	price: string
	period?: string
	originalPrice?: string
	features: string[]
	buttonText: string
	popular?: boolean
	discount?: boolean
}



function MonetizationPage() {
	const theme = useTheme()
	const { t } = useTranslation()

	const highlightPlans: Plan[] = [
		{
			id: 'highlight-7',
			name: t('monetization.plans.7days'),
			price: '$2.99',
			features: [
				t('monetization.features.topPosition'),
				t('monetization.features.moreVisibility'),
				t('monetization.features.highlightBadge'),
				t('monetization.features.viewStats'),
			],
			buttonText: t('monetization.buttons.highlight'),
		},
		{
			id: 'highlight-14',
			name: t('monetization.plans.14days'),
			price: '$4.99',
			features: [
				t('monetization.features.topPosition'),
				t('monetization.features.moreVisibility'),
				t('monetization.features.highlightBadge'),
				t('monetization.features.viewStats'),
				t('monetization.features.moreExposure'),
			],
			buttonText: t('monetization.buttons.highlight'),
			popular: true,
		},
	]

	const proPlans: Plan[] = [
		{
			id: 'pro-monthly',
			name: t('monetization.plans.monthly'),
			price: '$9.99',
			period: '/mes',
			features: [
				t('monetization.features.unlimitedAds'),
				t('monetization.features.advancedStats'),
				t('monetization.features.prioritySupport'),
				t('monetization.features.marketingTools'),
				t('monetization.features.noCommissions'),
			],
			buttonText: t('monetization.buttons.subscribe'),
		},
		{
			id: 'pro-yearly',
			name: t('monetization.plans.yearly'),
			price: '$99.99',
			period: '/año',
			originalPrice: '$119.88',
			features: [
				t('monetization.features.unlimitedAds'),
				t('monetization.features.advancedStats'),
				t('monetization.features.prioritySupport'),
				t('monetization.features.marketingTools'),
				t('monetization.features.noCommissions'),
				t('monetization.features.premiumFeatures'),
			],
			buttonText: t('monetization.buttons.subscribe'),
			discount: true,
		},
	]

	const handleSelectPlan = (planId: string) => {
		console.log('Plan seleccionado:', planId)
		// Aquí se implementaría la lógica de pago
	}

	const PlanCard: React.FC<{ plan: Plan; section: 'highlight' | 'pro' }> = ({ plan, section }) => (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				border: plan.popular ? `2px solid ${theme.palette.primary.main}` : '1px solid',
				borderColor: plan.popular ? 'primary.main' : 'divider',
			}}
		>
			{plan.popular && (
				<Chip
					label={t('monetization.labels.mostPopular')}
					color="primary"
					size="small"
					sx={{
						position: 'absolute',
						top: 16,
						right: 16,
						zIndex: 1,
					}}
				/>
			)}
			{plan.discount && (
				<Chip
					label={t('monetization.labels.discount')}
					color="secondary"
					size="small"
					sx={{
						position: 'absolute',
						top: 16,
						right: 16,
						zIndex: 1,
					}}
				/>
			)}
			<CardContent sx={{ 
				flexGrow: 1, 
				p: 3, 
				pt: plan.popular || plan.discount ? 6 : 3, // Aumentar padding top si hay chip
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				height: '100%'
			}}>
				<Box sx={{ flex: 1 }}>
					<Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
						{plan.name}
					</Typography>
					
					<Box sx={{ mb: 3 }}>
						<Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
							{plan.price}
							{plan.period && (
								<Typography component="span" variant="h6" color="text.secondary">
									{plan.period}
								</Typography>
							)}
						</Typography>
						{plan.originalPrice && (
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ textDecoration: 'line-through' }}
							>
								{plan.originalPrice}
							</Typography>
						)}
					</Box>

					<List sx={{ mb: 3 }}>
						{plan.features.map((feature, index) => (
							<ListItem key={index} sx={{ px: 0, py: 0.5, justifyContent: 'center' }}>
								<ListItemIcon sx={{ minWidth: 32 }}>
									<CheckIcon color="primary" fontSize="small" />
								</ListItemIcon>
								<ListItemText
									primary={feature}
									primaryTypographyProps={{
										variant: 'body2',
										sx: { fontWeight: 500 },
									}}
								/>
							</ListItem>
						))}
					</List>
				</Box>

				<Button
					variant="contained"
					fullWidth
					size="large"
					onClick={() => handleSelectPlan(plan.id)}
					sx={{
						bgcolor: plan.popular ? 'primary.main' : 'primary.main',
						'&:hover': {
							bgcolor: 'primary.dark',
						},
					}}
				>
					{plan.buttonText}
				</Button>
			</CardContent>
		</Card>
	)

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
			<AppHeader />

			<Container maxWidth="lg" sx={{ py: 6, flex: 1, textAlign: 'center' }}>
				{/* Título */}
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					sx={{
						fontWeight: 700,
						textAlign: 'center',
						mb: 6,
					}}
				>
					{t('monetization.title')}
				</Typography>

				{/* Sección Destacar Anuncio */}
				<Box sx={{ mb: 8, textAlign: 'center' }}>
					<Typography
						variant="h4"
						component="h2"
						gutterBottom
						sx={{
							fontWeight: 600,
							mb: 4,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
						}}
					>
						<StarIcon color="primary" />
						{t('monetization.highlightPlans.title')}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ mb: 4, textAlign: 'center' }}
					>
						{t('monetization.highlightPlans.subtitle')}
					</Typography>

					<Grid container spacing={3} justifyContent="center">
						{highlightPlans.map((plan) => (
							<Grid item xs={12} sm={6} md={5} key={plan.id}>
								<PlanCard plan={plan} section="highlight" />
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Sección Vendedor PRO */}
				<Box sx={{ mb: 8, textAlign: 'center' }}>
					<Typography
						variant="h4"
						component="h2"
						gutterBottom
						sx={{
							fontWeight: 600,
							mb: 4,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
						}}
					>
						<TrendingUpIcon color="primary" />
						{t('monetization.proPlans.title')}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ mb: 4, textAlign: 'center' }}
					>
						{t('monetization.proPlans.subtitle')}
					</Typography>

					<Grid container spacing={3} justifyContent="center">
						{proPlans.map((plan) => (
							<Grid item xs={12} sm={6} md={5} key={plan.id}>
								<PlanCard plan={plan} section="pro" />
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Información adicional */}
				<Box sx={{ textAlign: 'center', mt: 8 }}>
					<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
						¿Tienes preguntas?
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
						Nuestro equipo de soporte está aquí para ayudarte
					</Typography>
					<Button variant="outlined" size="large">
						Contactar soporte
					</Button>
				</Box>
			</Container>

			<Footer />
		</Box>
	)
}

export default MonetizationPage
