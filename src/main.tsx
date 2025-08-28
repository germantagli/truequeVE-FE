import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext'

// Importar i18n
import './i18n'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import MarketplaceHome from './components/MarketplaceHome'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Chat from './pages/Chat'
import PublishStepOne from './pages/PublishStepOne'
import SearchResultsPage from './pages/SearchResultsPage'
import MonetizationPage from './pages/MonetizationPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MarketplaceHome />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/product/:id',
		element: <ProductDetail />,
	},
	{
		path: '/chat',
		element: <ProtectedRoute><Chat /></ProtectedRoute>,
	},
	{
		path: '/publish/step1',
		element: <ProtectedRoute><PublishStepOne /></ProtectedRoute>,
	},
	{
		path: '/search',
		element: <SearchResultsPage />,
	},
	{
		path: '/monetizacion',
		element: <MonetizationPage />,
	},
	{
		path: '/profile',
		element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
	},
	{
		path: '/settings',
		element: <ProtectedRoute><SettingsPage /></ProtectedRoute>,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<CustomThemeProvider>
			<CssBaseline />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</CustomThemeProvider>
	</React.StrictMode>,
)
