import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: { main: '#2E7CF6' },
		secondary: { main: '#FF6B35' },
	},
	typography: {
		fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
	},
	shape: {
		borderRadius: 12,
	},
})

export default theme

