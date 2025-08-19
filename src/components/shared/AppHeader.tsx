import React, { useState } from 'react'
import {
	AppBar,
	Box,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Paper,
	Typography,
	Toolbar,
	Avatar,
	Divider,
} from '@mui/material'
import {
	Category as CategoryIcon,
	Add as AddIcon,
	Person as PersonIcon,
	Notifications as NotificationsIcon,
	Search as SearchIcon,
	Menu as MenuIcon,
	Logout as LogoutIcon,
	Login as LoginIcon,
	Chat as ChatIcon,
	SwapHoriz as SwapIcon,
	MonetizationOn as MonetizationIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

function AppHeader() {
	const { t } = useTranslation()
	const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)
	const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMenuAnchor(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMenuAnchor(null)
	}

	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenuAnchor(event.currentTarget)
	}

	const handleUserMenuClose = () => {
		setUserMenuAnchor(null)
	}

	const handleSearch = () => {
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
		}
	}

	const handlePublishClick = () => {
		navigate('/publish/step1')
	}

	const handleMonetizationClick = () => {
		navigate('/monetizacion')
	}

	return (
		<AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
			<Toolbar>
				{/* Logo */}
				<Typography 
					variant="h6" 
					sx={{ fontWeight: 700, color: 'primary.main', cursor: 'pointer' }}
					onClick={() => navigate('/')}
				>
					{t('header.logo')}
				</Typography>

				{/* Desktop Navigation */}
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4, gap: 2 }}>
					<Button 
						color="inherit" 
						startIcon={<CategoryIcon />}
						onClick={() => navigate('/search')}
					>
						{t('header.categories')}
					</Button>
					<Button 
						color="inherit" 
						startIcon={<AddIcon />}
						onClick={handlePublishClick}
					>
						{t('header.publish')}
					</Button>
					<Button 
						variant="outlined" 
						size="small"
						startIcon={<MonetizationIcon />}
						onClick={handleMonetizationClick}
					>
						{t('header.monetization')}
					</Button>
				</Box>

				{/* Search Bar */}
				<Paper
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
						width: { xs: '100%', sm: 300, md: 400 },
						mx: { xs: 2, md: 4 },
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder={t('header.search')}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
					/>
					<IconButton sx={{ p: '10px' }} onClick={handleSearch}>
						<SearchIcon />
					</IconButton>
				</Paper>

				{/* Desktop Actions - Simplificado */}
				<Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
					<LanguageToggle />
					<ThemeToggle />
					<Button 
						variant="outlined" 
						size="small"
						startIcon={<LoginIcon />}
						onClick={() => navigate('/login')}
					>
						{t('header.login')}
					</Button>
					<IconButton onClick={handleUserMenuOpen}>
						<Avatar sx={{ width: 32, height: 32 }}>
							U
						</Avatar>
					</IconButton>
				</Box>

				{/* Mobile Menu Button */}
				<IconButton
					sx={{ display: { xs: 'flex', md: 'none' } }}
					onClick={handleMobileMenuOpen}
					color="inherit"
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>

			{/* Mobile Menu */}
			<Menu
				anchorEl={mobileMenuAnchor}
				open={Boolean(mobileMenuAnchor)}
				onClose={handleMobileMenuClose}
				sx={{ display: { xs: 'block', md: 'none' } }}
			>
				<MenuItem onClick={() => { navigate('/search'); handleMobileMenuClose(); }}>
					<CategoryIcon sx={{ mr: 2 }} />
					{t('header.categories')}
				</MenuItem>
				<MenuItem onClick={() => { handlePublishClick(); handleMobileMenuClose(); }}>
					<AddIcon sx={{ mr: 2 }} />
					{t('header.publish')}
				</MenuItem>
				<MenuItem onClick={() => { handleMonetizationClick(); handleMobileMenuClose(); }}>
					<MonetizationIcon sx={{ mr: 2 }} />
					{t('header.monetization')}
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => { navigate('/chat'); handleMobileMenuClose(); }}>
					<ChatIcon sx={{ mr: 2 }} />
					{t('header.messages')}
				</MenuItem>
				<MenuItem onClick={() => { navigate('/login'); handleMobileMenuClose(); }}>
					<LoginIcon sx={{ mr: 2 }} />
					{t('header.login')}
				</MenuItem>
			</Menu>

			{/* User Menu - Con notificaciones y mensajes */}
			<Menu
				anchorEl={userMenuAnchor}
				open={Boolean(userMenuAnchor)}
				onClose={handleUserMenuClose}
			>
				<MenuItem onClick={() => { navigate('/profile'); handleUserMenuClose(); }}>
					<PersonIcon sx={{ mr: 2 }} />
					{t('header.profile')}
				</MenuItem>
				<MenuItem onClick={() => { navigate('/chat'); handleUserMenuClose(); }}>
					<ChatIcon sx={{ mr: 2 }} />
					{t('header.messages')}
				</MenuItem>
				<MenuItem onClick={() => { handleUserMenuClose(); }}>
					<NotificationsIcon sx={{ mr: 2 }} />
					{t('header.notifications')}
				</MenuItem>
				<MenuItem onClick={() => { navigate('/settings'); handleUserMenuClose(); }}>
					<SettingsIcon sx={{ mr: 2 }} />
					{t('header.settings')}
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => { navigate('/login'); handleUserMenuClose(); }}>
					<LogoutIcon sx={{ mr: 2 }} />
					{t('header.logout')}
				</MenuItem>
			</Menu>
		</AppBar>
	)
}

export default AppHeader
