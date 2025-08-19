import { Container, Toolbar, Typography } from '@mui/material'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

function App() {
	return (
		<>
			<AppHeader />
			<Toolbar />
			<Container sx={{ py: 4 }}>
				<Typography variant="h4" gutterBottom>Inicio</Typography>
				<Typography color="text.secondary">Bienvenido a la app.</Typography>
			</Container>
			<AppFooter />
		</>
	)
}

export default App
