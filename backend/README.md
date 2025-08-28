# TruequeVE Backend - Sistema OTP

Backend completo para TruequeVE con sistema de autenticación OTP (One-Time Password) implementado en Node.js/Express.

## 🚀 Características

- ✅ **Sistema OTP completo**: Generación, envío y verificación de códigos de 6 dígitos
- ✅ **Autenticación dual**: Email + contraseña + OTP
- ✅ **Base de datos SQLite**: Almacenamiento local con índices optimizados
- ✅ **JWT Tokens**: Autenticación segura con tokens
- ✅ **Rate Limiting**: Protección contra spam de OTPs
- ✅ **Validación robusta**: Validación de datos con express-validator
- ✅ **Envío de notificaciones**: Email y SMS (simulado en desarrollo)
- ✅ **Manejo de sesiones**: Gestión de sesiones activas
- ✅ **Seguridad**: Helmet, CORS, bcrypt para contraseñas

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar `.env` con tus configuraciones:
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=tu-clave-secreta-super-segura
FRONTEND_URL=http://localhost:5173
```

4. **Iniciar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📡 API Endpoints

### Autenticación

#### `POST /api/auth/register`
Registrar nuevo usuario con OTP
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+584141234567",
  "password": "123456",
  "otpCode": "123456",
  "type": "email"
}
```

#### `POST /api/auth/login`
Iniciar sesión con OTP
```json
{
  "email": "juan@example.com",
  "password": "123456",
  "otpCode": "123456",
  "type": "email"
}
```

#### `POST /api/auth/logout`
Cerrar sesión (requiere token)

#### `GET /api/auth/me`
Obtener información del usuario actual (requiere token)

#### `PUT /api/auth/profile`
Actualizar perfil (requiere token)
```json
{
  "name": "Juan Carlos Pérez",
  "phone": "+584141234568"
}
```

#### `POST /api/auth/change-password`
Cambiar contraseña (requiere token)
```json
{
  "currentPassword": "123456",
  "newPassword": "654321"
}
```

### OTP

#### `POST /api/otp/send`
Enviar código OTP
```json
{
  "email": "juan@example.com",
  "type": "email",
  "purpose": "login"
}
```

#### `POST /api/otp/verify`
Verificar código OTP
```json
{
  "email": "juan@example.com",
  "otpCode": "123456",
  "purpose": "login"
}
```

#### `GET /api/otp/status`
Verificar estado de OTP
```
/api/otp/status?email=juan@example.com&type=email&purpose=login
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3001` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `JWT_SECRET` | Clave secreta para JWT | `your-secret-key` |
| `JWT_EXPIRES_IN` | Expiración de JWT | `7d` |
| `FRONTEND_URL` | URL del frontend | `http://localhost:5173` |

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

## 🗄️ Base de Datos

### Tablas

#### `users`
- `id` (INTEGER PRIMARY KEY)
- `email` (TEXT UNIQUE)
- `phone` (TEXT UNIQUE)
- `name` (TEXT)
- `password_hash` (TEXT)
- `is_verified` (BOOLEAN)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

#### `otps`
- `id` (INTEGER PRIMARY KEY)
- `email` (TEXT)
- `phone` (TEXT)
- `otp_code` (TEXT)
- `type` (TEXT) - 'email' o 'phone'
- `purpose` (TEXT) - 'login', 'register', 'reset'
- `is_used` (BOOLEAN)
- `expires_at` (DATETIME)
- `created_at` (DATETIME)
- `used_at` (DATETIME)

#### `sessions`
- `id` (INTEGER PRIMARY KEY)
- `user_id` (INTEGER)
- `token` (TEXT UNIQUE)
- `expires_at` (DATETIME)
- `created_at` (DATETIME)

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

## 🧪 Testing

### Endpoints de prueba

#### Verificar salud del servidor
```bash
curl http://localhost:3001/api/health
```

#### Enviar OTP
```bash
curl -X POST http://localhost:3001/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "type": "email",
    "purpose": "register"
  }'
```

#### Registrar usuario
```bash
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

## 📝 Logs

El servidor registra todas las operaciones importantes:

- ✅ Usuarios creados
- 📱 OTPs enviados y verificados
- 🔐 Sesiones creadas y eliminadas
- 🧹 Limpieza automática de datos expirados
- ❌ Errores detallados

## 🚀 Despliegue

### Producción
1. Configurar variables de entorno de producción
2. Configurar servicio de email real (Gmail, SendGrid, etc.)
3. Configurar servicio de SMS real (Twilio, etc.)
4. Usar PM2 o similar para gestión de procesos
5. Configurar HTTPS con certificados SSL

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
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

1. Revisa los logs del servidor
2. Verifica la configuración de variables de entorno
3. Asegúrate de que la base de datos se inicialice correctamente
4. Revisa que el frontend esté configurado para conectarse al backend

---

**TruequeVE Backend** - Sistema de autenticación OTP seguro y escalable 🚀
