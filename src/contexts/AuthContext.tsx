import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { authService } from '../services/api'
import { setToken, getToken, isAuthenticated, clearToken } from '../utils/authStorage'
import { setupAuthSync, setupLocalAuthSync, dispatchAuthEvent } from '../utils/storageSync'
import type { User } from '../types/auth'

interface AuthContextType {
	user: User | null
	token: string | null
	isAuthenticated: boolean
	bootstrapped: boolean
	login: (token: string, ttlMs?: number) => Promise<boolean>
	register: (userData: {
		name: string
		email: string
		phone?: string
		password?: string
		otpCode: string
		type: 'email' | 'phone'
	}) => Promise<boolean>
	sendOTP: (email: string, phone: string, type: 'email' | 'phone', purpose: 'login' | 'register' | 'reset') => Promise<boolean>
	verifyOTP: (email: string, phone: string, otpCode: string, purpose: 'login' | 'register' | 'reset', type?: 'email' | 'phone') => Promise<boolean>
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
	const [token, setTokenState] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [bootstrapped, setBootstrapped] = useState(false)

	// Función para cargar datos del usuario desde el token
	const loadUserFromToken = useCallback(async (authToken: string) => {
		try {
			const response = await authService.getCurrentUser()
			if (response.success) {
				setUser(response.user)
				return true
			} else {
				// Token inválido, limpiar
				clearToken()
				setUser(null)
				setTokenState(null)
				return false
			}
		} catch (error) {
			console.error('Error loading user from token:', error)
			clearToken()
			setUser(null)
			setTokenState(null)
			return false
		}
	}, [])

	// Función para manejar cambios de autenticación
	const handleAuthChange = useCallback((event: { isAuthenticated: boolean; token: string | null; type: 'login' | 'logout' }) => {
		if (event.isAuthenticated && event.token) {
			setTokenState(event.token)
			loadUserFromToken(event.token)
		} else {
			setUser(null)
			setTokenState(null)
		}
	}, [loadUserFromToken])

	// Inicialización al montar el componente
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// Obtener token del storage
				const authToken = getToken()
				
				if (authToken) {
					setTokenState(authToken)
					await loadUserFromToken(authToken)
				}
			} catch (error) {
				console.error('Error initializing auth:', error)
				clearToken()
			} finally {
				setLoading(false)
				setBootstrapped(true)
			}
		}

		initializeAuth()
	}, [loadUserFromToken])

	// Configurar sincronización entre pestañas
	useEffect(() => {
		const cleanupStorageSync = setupAuthSync(handleAuthChange)
		const cleanupLocalSync = setupLocalAuthSync(handleAuthChange)

		return () => {
			cleanupStorageSync()
			cleanupLocalSync()
		}
	}, [handleAuthChange])

	const sendOTP = async (email: string, phone: string, type: 'email' | 'phone', purpose: 'login' | 'register' | 'reset'): Promise<boolean> => {
		try {
			const response = await authService.sendOTP(email, phone, type, purpose)
			return response.success
		} catch (error: any) {
			console.error('Send OTP error:', error)
			// Re-lanzar el error para que el componente lo maneje
			throw error
		}
	}

	const verifyOTP = async (email: string, phone: string, otpCode: string, purpose: 'login' | 'register' | 'reset', type?: 'email' | 'phone'): Promise<boolean> => {
		try {
			const response = await authService.verifyOTP(email, phone, otpCode, purpose, type)
			return response.success
		} catch (error) {
			console.error('Verify OTP error:', error)
			return false
		}
	}

	const register = async (userData: {
		name: string
		email: string
		phone?: string
		password?: string
		otpCode: string
		type: 'email' | 'phone'
	}): Promise<boolean> => {
		try {
			const response = await authService.register(userData)
			if (response.success) {
				// Usar la nueva función login para manejar el token
				return await login(response.token)
			}
			return false
		} catch (error) {
			console.error('Register error:', error)
			return false
		}
	}

	const login = async (authToken: string, ttlMs?: number): Promise<boolean> => {
		try {
			// Guardar token en storage
			setToken(authToken, ttlMs)
			
			// Actualizar estado local
			setTokenState(authToken)
			
			// Cargar datos del usuario
			const success = await loadUserFromToken(authToken)
			
			if (success) {
				// Disparar evento para sincronizar con otras pestañas
				dispatchAuthEvent('login', { token: authToken })
				return true
			}
			
			return false
		} catch (error) {
			console.error('Login error:', error)
			return false
		}
	}

	const logout = () => {
		try {
			// Limpiar token del storage
			clearToken()
			
			// Actualizar estado local
			setUser(null)
			setTokenState(null)
			
			// Disparar evento para sincronizar con otras pestañas
			dispatchAuthEvent('logout')
		} catch (error) {
			console.error('Logout error:', error)
		}
	}

	const value: AuthContextType = {
		user,
		token,
		isAuthenticated: isAuthenticated(),
		bootstrapped,
		login,
		register,
		sendOTP,
		verifyOTP,
		logout,
		loading,
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
