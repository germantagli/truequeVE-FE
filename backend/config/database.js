import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

// Inicializar la base de datos
export async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const dbPath = join(__dirname, '../data/truequeve.db');
    
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Error al conectar la base de datos:', err);
        reject(err);
        return;
      }
      
      console.log('📦 Base de datos SQLite conectada');
      
      // Crear tablas si no existen
      createTables()
        .then(() => resolve(db))
        .catch(reject);
    });
  });
}

// Crear tablas
async function createTables() {
  return new Promise(async (resolve, reject) => {
    try {
      // Ejecutar queries secuencialmente para evitar conflictos
      console.log('🔧 Eliminando tablas existentes...');
      
      await executeQuery('DROP TABLE IF EXISTS otps');
      await executeQuery('DROP TABLE IF EXISTS sessions');
      await executeQuery('DROP TABLE IF EXISTS users');
      
      console.log('🔧 Creando tabla users...');
      await executeQuery(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        phone TEXT UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT,
        is_verified BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
      
      console.log('🔧 Creando tabla sessions...');
      await executeQuery(`CREATE TABLE sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`);
      
      console.log('✅ Tablas básicas creadas correctamente');
      
      // Crear tabla OTPs después de las tablas básicas
      await createOTPTable();
      
      // Crear índices después de todas las tablas
      await createIndexes();
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// Función auxiliar para ejecutar queries
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        console.error('❌ Error al ejecutar query:', err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// Crear tabla OTPs por separado
async function createOTPTable() {
  return new Promise((resolve, reject) => {
    const otpQuery = `CREATE TABLE otps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      phone TEXT,
      otp_code TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('email', 'phone')),
      purpose TEXT NOT NULL CHECK(purpose IN ('login', 'register', 'reset')),
      is_used BOOLEAN DEFAULT 0,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      used_at DATETIME
    )`;
    
    console.log('🔧 Creando tabla OTPs...');
    db.run(otpQuery, (err) => {
      if (err) {
        console.error('❌ Error al crear tabla OTPs:', err);
        reject(err);
        return;
      }
      
      console.log('✅ Tabla OTPs creada correctamente');
      resolve();
    });
  });
}

// Crear índices
async function createIndexes() {
  return new Promise((resolve, reject) => {
    const indexes = [
      `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
      `CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone)`,
      `CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(email)`,
      `CREATE INDEX IF NOT EXISTS idx_otps_phone ON otps(phone)`,
      `CREATE INDEX IF NOT EXISTS idx_otps_expires ON otps(expires_at)`,
      `CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`,
      `CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`
    ];

    let completed = 0;
    const total = indexes.length;

    indexes.forEach((index, indexNum) => {
      db.run(index, (err) => {
        if (err) {
          console.error(`❌ Error al crear índice ${indexNum + 1}:`, err);
          // No rechazamos aquí, solo loggeamos el error
        }
        
        completed++;
        if (completed === total) {
          console.log('✅ Índices creados correctamente');
          resolve();
        }
      });
    });
  });
}

// Obtener instancia de la base de datos
export function getDatabase() {
  if (!db) {
    throw new Error('Base de datos no inicializada. Llama a initializeDatabase() primero.');
  }
  return db;
}

// Cerrar conexión
export async function closeDatabase() {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('❌ Error al cerrar la base de datos:', err);
        } else {
          console.log('🔒 Conexión a la base de datos cerrada');
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}
