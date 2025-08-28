/**
 * Script para crear un usuario de prueba
 * Ejecutar: node create-test-user.js
 */

import { getDatabase } from './config/database.js';

const createTestUser = async () => {
  const db = getDatabase();
  
  try {
    console.log('🧪 Creando usuario de prueba...');
    
    // Verificar si el usuario ya existe
    const existingUser = await new Promise((resolve, reject) => {
      db.get(
        'SELECT id, email, phone, name FROM users WHERE email = ?',
        ['test@example.com'],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (existingUser) {
      console.log('✅ Usuario de prueba ya existe:', existingUser);
      return existingUser;
    }

    // Crear usuario de prueba
    const result = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (email, phone, name, password_hash, is_verified) 
         VALUES (?, ?, ?, ?, ?)`,
        ['test@example.com', '+1234567890', 'Usuario de Prueba', null, 1],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ lastID: this.lastID, changes: this.changes });
          }
        }
      );
    });

    console.log('✅ Usuario de prueba creado con ID:', result.lastID);
    
    // Verificar que se creó correctamente
    const newUser = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE id = ?',
        [result.lastID],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    console.log('✅ Usuario creado:', newUser);
    return newUser;
    
  } catch (error) {
    console.error('❌ Error al crear usuario de prueba:', error);
    throw error;
  }
};

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestUser()
    .then(() => {
      console.log('✅ Script completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

export { createTestUser };
