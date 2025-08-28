const AUTH_STORAGE_KEY = 'auth_token';

interface AuthData {
  token: string;
  expiresAt: string | null;
}

/**
 * Guarda el token de autenticación en localStorage
 * @param token - Token JWT
 * @param ttlMs - Tiempo de vida en milisegundos (opcional)
 */
export const setToken = (token: string, ttlMs?: number): void => {
  const authData: AuthData = {
    token,
    expiresAt: ttlMs ? new Date(Date.now() + ttlMs).toISOString() : null
  };
  
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  } catch (error) {
    console.error('Error al guardar token en localStorage:', error);
  }
};

/**
 * Obtiene el token de autenticación del localStorage
 * Valida la expiración si existe y limpia si caducó
 * @returns Token válido o null
 */
export const getToken = (): string | null => {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!authData) return null;

    const { token, expiresAt }: AuthData = JSON.parse(authData);
    
    // Si no hay token, retornar null
    if (!token) return null;
    
    // Si hay fecha de expiración, validar
    if (expiresAt) {
      const now = new Date();
      const expirationDate = new Date(expiresAt);
      
      if (now >= expirationDate) {
        // Token expirado, limpiar y retornar null
        clearToken();
        return null;
      }
    }
    
    return token;
  } catch (error) {
    console.error('Error al obtener token del localStorage:', error);
    clearToken(); // Limpiar datos corruptos
    return null;
  }
};

/**
 * Verifica si el usuario está autenticado
 * @returns true si hay un token válido
 */
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

/**
 * Elimina el token del localStorage
 */
export const clearToken = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar token del localStorage:', error);
  }
};

/**
 * Obtiene información completa del token (para debugging)
 * @returns Datos del token o null
 */
export const getAuthData = (): AuthData | null => {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error('Error al obtener datos de autenticación:', error);
    return null;
  }
};
