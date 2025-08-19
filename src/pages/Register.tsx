import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Register() {
	return (
		<Container maxWidth="sm" sx={{ py: 6 }}>
			<Stack spacing={3}>
				<Typography variant="h4" fontWeight={700}>Crear cuenta</Typography>
				<TextField label="Nombre" fullWidth />
				<TextField label="Email" type="email" fullWidth />
				<TextField label="Contraseña" type="password" fullWidth />
				<Button variant="contained" color="primary">Registrarme</Button>
				<Typography variant="body2">¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink></Typography>
			</Stack>
		</Container>
	)
}

export default Register

