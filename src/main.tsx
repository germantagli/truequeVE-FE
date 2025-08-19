import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MarketplaceHome from './components/MarketplaceHome'
import ProductDetail from './pages/ProductDetail'
import Chat from './pages/Chat'
import { AuthProvider } from './contexts/AuthContext'

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
		element: <Chat />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>,
)
