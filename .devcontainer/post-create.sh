#!/bin/bash
set -e

echo "=== School Profile - Post Create Setup ==="
echo ""

# 1. Install backend dependencies
echo "[1/6] Installing backend dependencies..."
cd "$(dirname "$0")/../backend"
npm install
echo "  Backend dependencies installed."
echo ""

# 2. Install frontend dependencies
echo "[2/6] Installing frontend dependencies..."
cd "$(dirname "$0")/../frontend"
npm install
echo "  Frontend dependencies installed."
echo ""

# 3. Setup MySQL
echo "[3/6] Setting up MySQL database..."
sudo service mysql start 2>/dev/null || sudo mysqld_safe --skip-grant-tables &
sleep 2
sudo mysql -e "CREATE DATABASE IF NOT EXISTS school_profile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true
echo "  Database 'school_profile' created."
echo ""

# 4. Import schema and seed data
echo "[4/6] Importing database schema..."
cd "$(dirname "$0")/.."
sudo mysql school_profile < backend/database/schema.sql
echo "  Schema imported."

echo "[4/6] Importing seed data..."
sudo mysql school_profile < backend/database/seed.sql
echo "  Seed data imported."
echo ""

# 5. Setup .env files
echo "[5/6] Setting up environment files..."

# Backend .env
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  JWT_REFRESH=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  sed -i "s/your-super-secret-jwt-key-change-this/$JWT_SECRET/g" backend/.env
  sed -i "s/your-refresh-secret-key-change-this/$JWT_REFRESH/g" backend/.env
  echo "  Backend .env created with random JWT secrets."
else
  echo "  Backend .env already exists, skipped."
fi

# Frontend .env
if [ ! -f frontend/.env ]; then
  cp frontend/.env.example frontend/.env
  echo "  Frontend .env created."
else
  echo "  Frontend .env already exists, skipped."
fi
echo ""

# 6. Create upload directories
echo "[6/6] Ensuring upload directories exist..."
mkdir -p backend/uploads/images/{banners,galleries,logos,photos,sliders,thumbnails}
mkdir -p backend/uploads/documents/{downloads,ppdb}
touch backend/uploads/images/.gitkeep
touch backend/uploads/documents/.gitkeep
echo "  Upload directories ready."
echo ""

echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Start backend:  cd backend && npm run dev"
echo "  2. Start frontend: cd frontend && npm run dev"
echo "  3. Open http://localhost:5173 in your browser"
echo ""