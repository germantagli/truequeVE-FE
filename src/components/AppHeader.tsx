import { AppBar, Box, Button, InputBase, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function AppHeader() {
	return (
		<AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
			<Toolbar sx={{ gap: 2 }}>
				<Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
					MiLogo
				</Typography>
				<Box sx={{ flexGrow: 1, maxWidth: 600, display: 'flex', alignItems: 'center', px: 1.5, py: 0.5, borderRadius: 2, bgcolor: 'action.hover' }}>
					<SearchIcon fontSize="small" color="action" />
					<InputBase placeholder="Buscar…" sx={{ ml: 1, flex: 1 }} />
				</Box>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button variant="contained" color="primary">Publicar</Button>
					<Button variant="outlined" color="primary" href="/login">Iniciar sesión</Button>
					<Button variant="text" color="secondary" href="/account">Mi cuenta</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default AppHeader

