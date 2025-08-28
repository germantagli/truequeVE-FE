import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Crear usuario (con o sin contraseña)
export async function createUser(userData) {
  const db = getDatabase();
  
  try {
    // Convertir strings vacíos a null
    const cleanEmail = userData.email && userData.email.trim() !== '' ? userData.email : null;
    const cleanPhone = userData.phone && userData.phone.trim() !== '' ? userData.phone : null;
    
    console.log('🔍 Verificando si existe usuario con:', {
      email: cleanEmail,
      phone: cleanPhone
    });
    
    // Primero, ver qué hay en la tabla users usando promesas
    const allUsers = await new Promise((resolve, reject) => {
      db.all('SELECT id, email, phone, name FROM users', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
    console.log('📊 Todos los usuarios en la tabla:', allUsers);
    
    // Verificar si el usuario ya existe
    console.log('🔍 Ejecutando consulta SQL:', {
      query: 'SELECT id, email, phone FROM users WHERE email = ? OR phone = ?',
      params: [cleanEmail, cleanPhone]
    });
    
    const existingUser = await new Promise((resolve, reject) => {
      db.get(
        'SELECT id, email, phone FROM users WHERE email = ? OR phone = ?',
        [cleanEmail, cleanPhone],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    console.log('🔍 Resultado de la consulta:', existingUser);

    // Verificar si realmente existe un usuario (no solo un objeto Database vacío)
    if (existingUser && typeof existingUser === 'object' && existingUser.id !== undefined) {
      console.log('❌ Usuario ya existe:', existingUser);
      throw new Error('Usuario ya existe con este email o teléfono');
    }

    let passwordHash = null;
    
    // Si se proporciona contraseña, hashearla
    if (userData.password) {
      const saltRounds = 12;
      passwordHash = await bcrypt.hash(userData.password, saltRounds);
    }

    // Insertar usuario usando promesas para obtener el lastID correctamente
    const result = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (email, phone, name, password_hash, is_verified) 
         VALUES (?, ?, ?, ?, ?)`,
        [cleanEmail, cleanPhone, userData.name, passwordHash, 1],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ lastID: this.lastID, changes: this.changes });
          }
        }
      );
    });

    const userId = result.lastID;
    
    console.log(`🔍 Resultado de inserción:`, result);
    console.log(`🔍 User ID obtenido:`, userId);
    console.log(`✅ Usuario creado: ${userData.email || userData.phone}`);

    return {
      id: userId,
      email: cleanEmail,
      phone: cleanPhone,
      name: userData.name,
      isVerified: true
    };
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    throw error;
  }
}

// Buscar usuario por email o teléfono
export async function findUser(email, phone) {
  const db = getDatabase();
  
  try {
    // Convertir strings vacíos a null
    const cleanEmail = email && email.trim() !== '' ? email : null;
    const cleanPhone = phone && phone.trim() !== '' ? phone : null;
    
    console.log('🔍 Buscando usuario con:', {
      email: cleanEmail,
      phone: cleanPhone
    });
    
    const user = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ? OR phone = ?',
        [cleanEmail, cleanPhone],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    console.log('🔍 Usuario encontrado:', user);
    return user;
  } catch (error) {
    console.error('❌ Error al buscar usuario:', error);
    throw error;
  }
}

// Verificar contraseña (maneja usuarios sin contraseña)
export async function verifyPassword(password, passwordHash) {
  try {
    // Si el usuario no tiene contraseña, no se puede verificar
    if (!passwordHash) {
      return false;
    }
    return await bcrypt.compare(password, passwordHash);
  } catch (error) {
    console.error('❌ Error al verificar contraseña:', error);
    return false;
  }
}

// Generar JWT token
export function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    isVerified: user.is_verified
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verificar JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('❌ Error al verificar token:', error);
    return null;
  }
}

// Crear sesión
export async function createSession(userId, token) {
  const db = getDatabase();
  
  try {
    console.log(`🔍 Creando sesión para userId:`, userId);
    console.log(`🔍 Token:`, token);
    
    // Expira en 7 días
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    await db.run(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt.toISOString()]
    );

    console.log(`🔐 Sesión creada para usuario ${userId}`);
  } catch (error) {
    console.error('❌ Error al crear sesión:', error);
    throw error;
  }
}

// Verificar sesión
export async function verifySession(token) {
  const db = getDatabase();
  
  try {
    const session = await db.get(
      'SELECT * FROM sessions WHERE token = ? AND expires_at > datetime("now")',
      [token]
    );

    if (!session) {
      return null;
    }

    // Obtener información del usuario
    const user = await db.get(
      'SELECT id, email, phone, name, is_verified FROM users WHERE id = ?',
      [session.user_id]
    );

    return user;
  } catch (error) {
    console.error('❌ Error al verificar sesión:', error);
    return null;
  }
}

// Eliminar sesión (logout)
export async function deleteSession(token) {
  const db = getDatabase();
  
  try {
    await db.run('DELETE FROM sessions WHERE token = ?', [token]);
    console.log('🔓 Sesión eliminada');
  } catch (error) {
    console.error('❌ Error al eliminar sesión:', error);
    throw error;
  }
}

// Limpiar sesiones expiradas
export async function cleanupExpiredSessions() {
  const db = getDatabase();
  
  try {
    const result = await db.run(
      'DELETE FROM sessions WHERE expires_at < datetime("now")'
    );
    
    if (result.changes > 0) {
      console.log(`🧹 ${result.changes} sesiones expiradas eliminadas`);
    }
  } catch (error) {
    console.error('❌ Error al limpiar sesiones expiradas:', error);
  }
}

// Actualizar usuario
export async function updateUser(userId, updateData) {
  const db = getDatabase();
  
  try {
    const fields = [];
    const values = [];

    if (updateData.name) {
      fields.push('name = ?');
      values.push(updateData.name);
    }

    if (updateData.phone) {
      fields.push('phone = ?');
      values.push(updateData.phone);
    }

    if (updateData.password) {
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(updateData.password, saltRounds);
      fields.push('password_hash = ?');
      values.push(passwordHash);
    }

    if (fields.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    fields.push('updated_at = datetime("now")');
    values.push(userId);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    await db.run(query, values);

    console.log(`✅ Usuario ${userId} actualizado`);

    // Obtener usuario actualizado
    const updatedUser = await db.get(
      'SELECT id, email, phone, name, is_verified FROM users WHERE id = ?',
      [userId]
    );

    return updatedUser;
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    throw error;
  }
}

// Eliminar usuario
export async function deleteUser(userId) {
  const db = getDatabase();
  
  try {
    // Eliminar sesiones del usuario
    await db.run('DELETE FROM sessions WHERE user_id = ?', [userId]);
    
    // Eliminar OTPs del usuario
    const user = await db.get('SELECT email, phone FROM users WHERE id = ?', [userId]);
    if (user) {
      await db.run(
        'DELETE FROM otps WHERE email = ? OR phone = ?',
        [user.email, user.phone]
      );
    }
    
    // Eliminar usuario
    await db.run('DELETE FROM users WHERE id = ?', [userId]);

    console.log(`🗑️ Usuario ${userId} eliminado`);
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    throw error;
  }
}
