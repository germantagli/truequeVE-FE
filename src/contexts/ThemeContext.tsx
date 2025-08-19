import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from '../theme'

interface ThemeContextType {
	isDarkMode: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeMode = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useThemeMode must be used within a ThemeProvider')
	}
	return context
}

interface ThemeProviderProps {
	children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem('darkMode')
		return saved ? JSON.parse(saved) : false
	})

	const toggleTheme = () => {
		console.log('toggleTheme called, current isDarkMode:', isDarkMode)
		setIsDarkMode((prev: boolean) => {
			const newMode = !prev
			console.log('Setting new theme mode:', newMode)
			localStorage.setItem('darkMode', JSON.stringify(newMode))
			return newMode
		})
	}

	const currentTheme = isDarkMode ? darkTheme : lightTheme
	
	console.log('ThemeContext rendering with isDarkMode:', isDarkMode, 'theme mode:', currentTheme.palette.mode)

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			<MuiThemeProvider theme={currentTheme}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	)
}
