# 🚀 Inicio Rápido - TruequeVE OTP

## Instalación Automática

### Windows
```bash
setup.bat
```

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

## Instalación Manual

### 1. Backend
```bash
cd backend
npm install
cp env.example .env
# Editar .env con tus configuraciones
npm run dev
```

### 2. Frontend
```bash
npm install
cp env.example .env
# Editar .env: VITE_API_URL=http://localhost:3001/api
npm run dev
```

## 🌐 Acceso
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health

## 🧪 Prueba Rápida

1. Abre http://localhost:5173
2. Ve a "Registrarse"
3. Completa el formulario
4. Selecciona "Email" como tipo de verificación
5. Revisa la consola del backend para ver el OTP
6. Ingresa el código OTP
7. ¡Listo! Tu cuenta está creada

## 📱 Flujo de Autenticación

### Registro
1. Datos básicos → 2. Envío OTP → 3. Verificación → 4. Cuenta creada

### Login
1. Credenciales → 2. Envío OTP → 3. Verificación → 4. Sesión iniciada

## 🔧 Configuración Mínima

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=tu-clave-secreta
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## 🆘 Problemas Comunes

### Error de Node.js
- Asegúrate de tener Node.js 18+
- `node --version`

### Error de puertos
- Verifica que los puertos 3001 y 5173 estén libres
- Cambia los puertos en los archivos .env

### Error de conexión
- Verifica que ambos servicios estén corriendo
- Revisa la URL de la API en el frontend

## 📞 Soporte
- Revisa los logs en la consola
- Consulta el README.md completo
- Verifica la configuración de variables de entorno
