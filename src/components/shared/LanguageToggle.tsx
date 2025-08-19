import React, { useState } from 'react'
import {
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Box,
} from '@mui/material'
import {
	Language as LanguageIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const LanguageToggle: React.FC = () => {
	const { i18n, t } = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language)
		handleMenuClose()
	}

	const getCurrentLanguageName = () => {
		const currentLang = i18n.language
		switch (currentLang) {
			case 'es':
				return 'ES'
			case 'en':
				return 'EN'
			case 'it':
				return 'IT'
			default:
				return 'ES'
		}
	}

	return (
		<>
			<IconButton
				onClick={handleMenuOpen}
				color="inherit"
				size="small"
				sx={{ 
					minWidth: 'auto',
					px: 1,
					border: '1px solid',
					borderColor: 'divider',
					borderRadius: 1
				}}
			>
				<LanguageIcon sx={{ fontSize: 18, mr: 0.5 }} />
				<Typography variant="caption" sx={{ fontWeight: 600 }}>
					{getCurrentLanguageName()}
				</Typography>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				sx={{ mt: 1 }}
			>
				<MenuItem onClick={() => handleLanguageChange('es')}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography variant="body2">🇪🇸</Typography>
						<Typography>Español</Typography>
					</Box>
				</MenuItem>
				<MenuItem onClick={() => handleLanguageChange('en')}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography variant="body2">🇺🇸</Typography>
						<Typography>English</Typography>
					</Box>
				</MenuItem>
				<MenuItem onClick={() => handleLanguageChange('it')}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography variant="body2">🇮🇹</Typography>
						<Typography>Italiano</Typography>
					</Box>
				</MenuItem>
			</Menu>
		</>
	)
}

export default LanguageToggle
