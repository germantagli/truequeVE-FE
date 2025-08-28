import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Importar configuración de base de datos
import { initializeDatabase } from './config/database.js';

// Importar rutas
import authRoutes from './routes/auth.js';
import otpRoutes from './routes/otp.js';

// Importar servicios
import { cleanupExpiredOTPs } from './services/otpService.js';

// Configurar dotenv
dotenv.config();

// Log de configuración
console.log('🔧 Configuración del servidor:');
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   PORT:', process.env.PORT || 3001);
console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:5173');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());

// Configurar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting (configuración de desarrollo)
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 500, // máximo 500 requests por 5 minutos (para desarrollo)
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo en 5 minutos.'
  }
});
app.use(limiter);

// Rate limiting específico para OTP (configuración de desarrollo)
const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // máximo 10 solicitudes de OTP por minuto (para desarrollo)
  message: {
    error: 'Demasiadas solicitudes de OTP. Intenta de nuevo en 1 minuto.'
  }
});

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpLimiter, otpRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'TruequeVE Backend funcionando correctamente'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`
  });
});

// Inicializar base de datos y iniciar servidor
async function startServer() {
  try {
    // Inicializar base de datos
    await initializeDatabase();
    
    // Configurar limpieza automática de OTPs expirados (cada 5 minutos)
    setInterval(async () => {
      try {
        await cleanupExpiredOTPs();
      } catch (error) {
        console.error('❌ Error al limpiar OTPs expirados:', error);
      }
    }, 5 * 60 * 1000); // 5 minutos
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📧 Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`📦 Base de datos: SQLite inicializada`);
      console.log(`🧹 Limpieza automática de OTPs configurada (cada 5 minutos)`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;
