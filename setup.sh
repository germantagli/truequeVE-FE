#!/bin/bash

echo "🚀 Configurando TruequeVE - Sistema OTP"
echo "========================================"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versión $NODE_VERSION detectada. Se requiere Node.js 18+"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Crear directorio backend si no existe
if [ ! -d "backend" ]; then
    echo "📁 Creando directorio backend..."
    mkdir -p backend
fi

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

# Configurar variables de entorno del backend
if [ ! -f ".env" ]; then
    echo "⚙️ Configurando variables de entorno del backend..."
    cp env.example .env
    echo "✅ Archivo .env creado en backend/"
fi

cd ..

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
npm install

# Configurar variables de entorno del frontend
if [ ! -f ".env" ]; then
    echo "⚙️ Configurando variables de entorno del frontend..."
    cp env.example .env
    echo "✅ Archivo .env creado en el directorio raíz"
fi

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Edita backend/.env con tus configuraciones"
echo "2. Edita .env con la URL de la API"
echo "3. Ejecuta 'npm run dev' en el directorio raíz para el frontend"
echo "4. Ejecuta 'cd backend && npm run dev' para el backend"
echo ""
echo "🌐 URLs de acceso:"
echo "- Frontend: http://localhost:5173"
echo "- Backend: http://localhost:3001"
echo "- Health Check: http://localhost:3001/api/health"
echo ""
echo "📚 Para más información, consulta el README.md"
