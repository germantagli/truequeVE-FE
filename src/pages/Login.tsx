import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Login() {
	return (
		<Container maxWidth="sm" sx={{ py: 6 }}>
			<Stack spacing={3}>
				<Typography variant="h4" fontWeight={700}>Iniciar sesión</Typography>
				<TextField label="Email" type="email" fullWidth />
				<TextField label="Contraseña" type="password" fullWidth />
				<Button variant="contained" color="primary">Entrar</Button>
				<Typography variant="body2">¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink></Typography>
			</Stack>
		</Container>
	)
}

export default Login

