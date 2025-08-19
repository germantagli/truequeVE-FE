import { Box, Container, Link, Stack, Typography } from '@mui/material'

function AppFooter() {
	return (
		<Box component="footer" sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, py: 3, mt: 6 }}>
			<Container maxWidth="lg">
				<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
					<Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} MiSitio</Typography>
					<Stack direction="row" spacing={3}>
						<Link href="#" color="inherit" underline="hover">Ayuda</Link>
						<Link href="#" color="inherit" underline="hover">Términos</Link>
						<Link href="#" color="inherit" underline="hover">Privacidad</Link>
					</Stack>
				</Stack>
			</Container>
		</Box>
	)
}

export default AppFooter

