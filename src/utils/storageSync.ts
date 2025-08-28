/**
 * Helper para sincronizar cambios de autenticación entre pestañas
 * Usa el evento 'storage' para detectar cambios en localStorage
 */

const AUTH_STORAGE_KEY = 'auth_token';

interface AuthChangeEvent {
  isAuthenticated: boolean;
  token: string | null;
  type: 'login' | 'logout';
}

interface AuthData {
  token: string;
  expiresAt: string | null;
}

/**
 * Configura un listener para sincronizar cambios de autenticación entre pestañas
 * @param onAuthChange - Callback que se ejecuta cuando cambia el estado de autenticación
 * @returns Función para remover el listener
 */
export const setupAuthSync = (onAuthChange: (event: AuthChangeEvent) => void): (() => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    // Solo procesar cambios en la clave de autenticación
    if (event.key === AUTH_STORAGE_KEY) {
      const newValue = event.newValue;
      const oldValue = event.oldValue;
      
      // Solo notificar si realmente cambió el valor
      if (newValue !== oldValue) {
        try {
          const newAuthData: AuthData | null = newValue ? JSON.parse(newValue) : null;
          const oldAuthData: AuthData | null = oldValue ? JSON.parse(oldValue) : null;
          
          // Determinar el tipo de cambio
          const isAuthenticated = newAuthData && newAuthData.token;
          const wasAuthenticated = oldAuthData && oldAuthData.token;
          
          if (isAuthenticated !== wasAuthenticated) {
            onAuthChange({
              isAuthenticated,
              token: newAuthData?.token || null,
              type: isAuthenticated ? 'login' : 'logout'
            });
          }
        } catch (error) {
          console.error('Error al procesar cambio de autenticación:', error);
        }
      }
    }
  };

  // Agregar listener
  window.addEventListener('storage', handleStorageChange);
  
  // Retornar función para remover el listener
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

/**
 * Dispara un evento personalizado para sincronizar cambios en la misma pestaña
 * @param type - Tipo de evento ('login' | 'logout')
 * @param data - Datos adicionales
 */
export const dispatchAuthEvent = (type: 'login' | 'logout', data: Record<string, any> = {}): void => {
  const event = new CustomEvent('authChange', {
    detail: { type, ...data }
  });
  window.dispatchEvent(event);
};

/**
 * Configura un listener para eventos de autenticación en la misma pestaña
 * @param onAuthChange - Callback que se ejecuta cuando cambia el estado de autenticación
 * @returns Función para remover el listener
 */
export const setupLocalAuthSync = (onAuthChange: (event: AuthChangeEvent) => void): (() => void) => {
  const handleAuthEvent = (event: CustomEvent<AuthChangeEvent>) => {
    onAuthChange(event.detail);
  };

  window.addEventListener('authChange', handleAuthEvent as EventListener);
  
  return () => {
    window.removeEventListener('authChange', handleAuthEvent as EventListener);
  };
};
