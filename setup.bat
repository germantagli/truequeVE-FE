@echo off
echo 🚀 Configurando TruequeVE - Sistema OTP
echo ========================================

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js 18+
    pause
    exit /b 1
)

echo ✅ Node.js detectado

REM Crear directorio backend si no existe
if not exist "backend" (
    echo 📁 Creando directorio backend...
    mkdir backend
)

REM Instalar dependencias del backend
echo 📦 Instalando dependencias del backend...
cd backend
call npm install

REM Configurar variables de entorno del backend
if not exist ".env" (
    echo ⚙️ Configurando variables de entorno del backend...
    copy env.example .env
    echo ✅ Archivo .env creado en backend/
)

cd ..

REM Instalar dependencias del frontend
echo 📦 Instalando dependencias del frontend...
call npm install

REM Configurar variables de entorno del frontend
if not exist ".env" (
    echo ⚙️ Configurando variables de entorno del frontend...
    copy env.example .env
    echo ✅ Archivo .env creado en el directorio raíz
)

echo.
echo 🎉 Configuración completada!
echo.
echo 📋 Próximos pasos:
echo 1. Edita backend\.env con tus configuraciones
echo 2. Edita .env con la URL de la API
echo 3. Ejecuta 'npm run dev' en el directorio raíz para el frontend
echo 4. Ejecuta 'cd backend ^&^& npm run dev' para el backend
echo.
echo 🌐 URLs de acceso:
echo - Frontend: http://localhost:5173
echo - Backend: http://localhost:3001
echo - Health Check: http://localhost:3001/api/health
echo.
echo 📚 Para más información, consulta el README.md
pause
