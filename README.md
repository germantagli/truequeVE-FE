# TruequeVE - Sistema de Autenticación OTP

Sistema completo de autenticación con OTP (One-Time Password) para TruequeVE, implementado con React + TypeScript en el frontend y Node.js/Express en el backend.

## 🚀 Características

### Backend (Node.js/Express)
- ✅ **Sistema OTP completo**: Generación, envío y verificación de códigos de 6 dígitos
- ✅ **Autenticación dual**: Email + contraseña + OTP
- ✅ **Base de datos SQLite**: Almacenamiento local con índices optimizados
- ✅ **JWT Tokens**: Autenticación segura con tokens
- ✅ **Rate Limiting**: Protección contra spam de OTPs
- ✅ **Validación robusta**: Validación de datos con express-validator
- ✅ **Envío de notificaciones**: Email y SMS (simulado en desarrollo)
- ✅ **Manejo de sesiones**: Gestión de sesiones activas
- ✅ **Seguridad**: Helmet, CORS, bcrypt para contraseñas

### Frontend (React + TypeScript)
- ✅ **Interfaz moderna**: Material-UI con diseño responsive
- ✅ **Sistema OTP integrado**: Componente reutilizable para verificación
- ✅ **Autenticación completa**: Login y registro con OTP
- ✅ **Gestión de estado**: Context API para autenticación
- ✅ **Validación en tiempo real**: Validación de formularios
- ✅ **Internacionalización**: Soporte multiidioma con i18next
- ✅ **UX optimizada**: Loading states, error handling, feedback visual

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd truequeVE-FE
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env
```

Editar `.env` con tus configuraciones:
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=tu-clave-secreta-super-segura
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar Frontend

```bash
# Volver al directorio raíz
cd ..

# Instalar dependencias del frontend
npm install

# Configurar variables de entorno
cp env.example .env
```

Editar `.env` del frontend:
```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Ejecutar el proyecto

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## 📱 Flujo de Autenticación

### Registro
1. Usuario ingresa nombre, email/teléfono, contraseña
2. Selecciona tipo de verificación (email o SMS)
3. Sistema envía código OTP de 6 dígitos
4. Usuario ingresa el código OTP
5. Sistema verifica y crea la cuenta
6. Usuario es autenticado automáticamente

### Login
1. Usuario ingresa email/teléfono y contraseña
2. Selecciona tipo de verificación (email o SMS)
3. Sistema envía código OTP de 6 dígitos
4. Usuario ingresa el código OTP
5. Sistema verifica credenciales y OTP
6. Usuario es autenticado

## 🔧 Configuración Avanzada

### Email (Desarrollo)
```env
ETHEREAL_USER=test@ethereal.email
ETHEREAL_PASS=test123
```

### Email (Producción)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
FROM_EMAIL=noreply@truequeve.com
```

### SMS (Producción)
```env
TWILIO_ACCOUNT_SID=tu-account-sid
TWILIO_AUTH_TOKEN=tu-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## 🧪 Testing

### Backend
```bash
cd backend

# Verificar salud del servidor
curl http://localhost:3001/api/health

# Enviar OTP
curl -X POST http://localhost:3001/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "type": "email",
    "purpose": "register"
  }'

# Registrar usuario
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456",
    "otpCode": "123456",
    "type": "email"
  }'
```

### Frontend
- Abrir http://localhost:5173
- Probar registro y login con diferentes tipos de verificación
- Verificar que los OTPs se muestren en la consola del backend

## 📁 Estructura del Proyecto

```
truequeVE-FE/
├── backend/                 # Backend Node.js/Express
│   ├── config/             # Configuración de base de datos
│   ├── routes/             # Rutas de la API
│   ├── services/           # Servicios de negocio
│   ├── data/               # Base de datos SQLite
│   └── server.js           # Servidor principal
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── contexts/           # Context API
│   ├── pages/              # Páginas de la aplicación
│   ├── services/           # Servicios de API
│   └── main.tsx            # Punto de entrada
└── README.md               # Documentación
```

## 🔒 Seguridad

### Rate Limiting
- **General**: 100 requests por 15 minutos
- **OTP**: 3 requests por 5 minutos

### Validaciones
- Email válido
- Teléfono válido
- Contraseña mínima 6 caracteres
- OTP de 6 dígitos
- Propósitos válidos: login, register, reset

### Encriptación
- Contraseñas hasheadas con bcrypt (12 rounds)
- JWT tokens firmados
- Sesiones con expiración

## 🚀 Despliegue

### Producción
1. Configurar variables de entorno de producción
2. Configurar servicio de email real (Gmail, SendGrid, etc.)
3. Configurar servicio de SMS real (Twilio, etc.)
4. Usar PM2 o similar para gestión de procesos
5. Configurar HTTPS con certificados SSL

### Docker (Opcional)
```dockerfile
# Backend
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 3001
CMD ["npm", "start"]

# Frontend
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa los logs del servidor backend
2. Verifica la configuración de variables de entorno
3. Asegúrate de que la base de datos se inicialice correctamente
4. Revisa que el frontend esté configurado para conectarse al backend
5. Verifica que ambos servicios estén corriendo en los puertos correctos

## 📝 Logs

### Backend
El servidor registra todas las operaciones importantes:
- ✅ Usuarios creados
- 📱 OTPs enviados y verificados
- 🔐 Sesiones creadas y eliminadas
- 🧹 Limpieza automática de datos expirados
- ❌ Errores detallados

### Frontend
- Console logs para debugging
- Error boundaries para capturar errores
- Loading states para mejor UX

---

**TruequeVE** - Sistema de autenticación OTP seguro y escalable 🚀
