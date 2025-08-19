import React from 'react'
import {
	Box,
	Container,
	Stack,
	Typography,
	Button,
	useTheme,
} from '@mui/material'
import {
	Help as HelpIcon,
	Description as TermsIcon,
	Security as PrivacyIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
	const theme = useTheme()
	const { t } = useTranslation()

	return (
		<Box
			component="footer"
			sx={{
				bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
				py: 4,
				width: '100%',
				borderTop: `1px solid ${theme.palette.divider}`,
				mt: 'auto',
			}}
		>
			<Container maxWidth="lg">
				<Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
					<Button 
						startIcon={<HelpIcon />} 
						color="inherit"
						sx={{
							color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
							'&:hover': {
								color: theme.palette.mode === 'dark' ? 'white' : 'grey.900',
							}
						}}
					>
						{t('footer.links.help')}
					</Button>
					<Button 
						startIcon={<TermsIcon />} 
						color="inherit"
						sx={{
							color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
							'&:hover': {
								color: theme.palette.mode === 'dark' ? 'white' : 'grey.900',
							}
						}}
					>
						{t('footer.links.terms')}
					</Button>
					<Button 
						startIcon={<PrivacyIcon />} 
						color="inherit"
						sx={{
							color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
							'&:hover': {
								color: theme.palette.mode === 'dark' ? 'white' : 'grey.900',
							}
						}}
					>
						{t('footer.links.privacy')}
					</Button>
				</Stack>
				<Typography 
					variant="body2" 
					color="text.secondary" 
					sx={{ 
						mt: 2, 
						textAlign: { xs: 'center', md: 'left' },
						color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600'
					}}
				>
					{t('footer.copyright')}
				</Typography>
			</Container>
		</Box>
	)
}

export default Footer
