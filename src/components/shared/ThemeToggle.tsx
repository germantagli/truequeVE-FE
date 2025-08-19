import React from 'react'
import { IconButton } from '@mui/material'
import { Contrast as ContrastIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material'
import { useThemeMode } from '../../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
	const { isDarkMode, toggleTheme } = useThemeMode()

	const handleToggle = () => {
		console.log('ThemeToggle clicked, current mode:', isDarkMode)
		toggleTheme()
	}

	return (
		<IconButton
			onClick={handleToggle}
			color="inherit"
			size="small"
			title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
		>
			{isDarkMode ? <LightbulbIcon /> : <ContrastIcon />}
		</IconButton>
	)
}

export default ThemeToggle
