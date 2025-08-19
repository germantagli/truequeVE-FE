import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: { main: '#00E676' },
		secondary: { main: '#FF6B35' },
	},
	typography: {
		fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				},
			},
		},
	},
})

export default theme

