import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
	email: string
	token: string
}

interface AuthContextType {
	user: User | null
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<boolean>
	logout: () => void
	loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Verificar si hay un usuario autenticado al cargar la app
		const token = localStorage.getItem('authToken')
		const email = localStorage.getItem('userEmail')
		
		if (token && email) {
			setUser({ email, token })
		}
		
		setLoading(false)
	}, [])

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			// Simular llamada a API
			await new Promise(resolve => setTimeout(resolve, 1500))
			
			// Validación de demo
			if (email === 'test@example.com' && password === '123456') {
				const token = 'mock-jwt-token-' + Date.now()
				const userData = { email, token }
				
				// Guardar en localStorage
				localStorage.setItem('authToken', token)
				localStorage.setItem('userEmail', email)
				
				// Actualizar estado
				setUser(userData)
				return true
			}
			
			return false
		} catch (error) {
			console.error('Login error:', error)
			return false
		}
	}

	const logout = () => {
		// Limpiar localStorage
		localStorage.removeItem('authToken')
		localStorage.removeItem('userEmail')
		
		// Actualizar estado
		setUser(null)
	}

	const value: AuthContextType = {
		user,
		isAuthenticated: !!user,
		login,
		logout,
		loading,
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
