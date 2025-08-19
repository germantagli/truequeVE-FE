import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: { 
			main: '#00E676',
			light: '#66FFA6',
			dark: '#00C853',
			contrastText: '#000000',
		},
		secondary: { 
			main: '#FF6B35',
			light: '#FF9A6B',
			dark: '#E55A2B',
		},
		background: {
			default: '#fafafa',
			paper: '#ffffff',
		},
		text: {
			primary: '#000000',
			secondary: '#666666',
		},
	},
	typography: {
		fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
		h1: {
			fontWeight: 700,
		},
		h2: {
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
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
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 600,
				},
				contained: {
					boxShadow: '0 2px 8px rgba(0,230,118,0.3)',
					'&:hover': {
						boxShadow: '0 4px 12px rgba(0,230,118,0.4)',
					},
				},
			},
		},
	},
})

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: { 
			main: '#00E676',
			light: '#66FFA6',
			dark: '#00C853',
			contrastText: '#000000',
		},
		secondary: { 
			main: '#FF6B35',
			light: '#FF9A6B',
			dark: '#E55A2B',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b3b3b3',
		},
	},
	typography: {
		fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
		h1: {
			fontWeight: 700,
		},
		h2: {
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 600,
				},
				contained: {
					boxShadow: '0 2px 8px rgba(0,230,118,0.3)',
					'&:hover': {
						boxShadow: '0 4px 12px rgba(0,230,118,0.4)',
					},
				},
			},
		},
	},
})

export { lightTheme, darkTheme }
export default lightTheme

