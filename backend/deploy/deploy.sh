#!/bin/bash
# Deployment script for School Profile Website
# Usage: bash deploy.sh [branch]

set -e

BRANCH=${1:-main}
APP_DIR="/var/www/school-profile"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$APP_DIR/backups/$TIMESTAMP"

echo "=== Deploying School Profile Website ==="
echo "Branch: $BRANCH"
echo "Time: $(date)"

# 1. Backup existing data
echo "[1/10] Backing up current version..."
mkdir -p "$BACKUP_DIR"
if [ -d "$BACKEND_DIR" ]; then
    cp -r "$BACKEND_DIR/.env" "$BACKUP_DIR/.env.backup" 2>/dev/null || true
    cp -r "$BACKEND_DIR/uploads" "$BACKUP_DIR/uploads.backup" 2>/dev/null || true
fi

# 2. Pull latest code
echo "[2/10] Pulling latest code..."
cd "$APP_DIR"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# 3. Install backend dependencies
echo "[3/10] Installing backend dependencies..."
cd "$BACKEND_DIR"
npm ci --production

# 4. Restore environment
echo "[4/10] Restoring environment..."
if [ -f "$BACKUP_DIR/.env.backup" ]; then
    cp "$BACKUP_DIR/.env.backup" "$BACKEND_DIR/.env"
    echo "  Restored .env from backup"
fi

# 5. Run database migration
echo "[5/10] Running database migration..."
node -e "
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function migrate() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });
    const sql = fs.readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8');
    await conn.query('CREATE DATABASE IF NOT EXISTS \`' + process.env.DB_NAME + '\`');
    await conn.query('USE \`' + process.env.DB_NAME + '\`');
    await conn.query(sql);
    console.log('  Migration completed');
    await conn.end();
}
migrate().catch(console.error);
"

# 6. Build frontend
echo "[6/10] Building frontend..."
cd "$FRONTEND_DIR"
npm ci
npm run build

# 7. Set frontend permissions for Nginx
echo "[7/10] Setting frontend permissions for Nginx..."
sudo chown -R www-data:www-data "$FRONTEND_DIR/dist"
sudo chmod -R 755 "$FRONTEND_DIR/dist"

# 8. Configure Nginx
echo "[8/10] Configuring Nginx..."
sudo cp "$BACKEND_DIR/deploy/nginx.conf" /etc/nginx/sites-available/school-profile
sudo ln -sf /etc/nginx/sites-available/school-profile /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx || echo "WARNING: Nginx config test failed"

# 9. Restart application
echo "[9/10] Restarting application..."
cd "$BACKEND_DIR"
pm2 startOrReload ecosystem.config.js --env production
pm2 save

# 10. Verify deployment
echo "[10/10] Verifying deployment..."
sleep 3
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health || echo "000")
if [ "$HEALTH" = "200" ]; then
    echo "  API Health: OK (200)"
else
    echo "  WARNING: API returned $HEALTH"
fi

echo ""
echo "=== Deployment completed successfully ==="
echo "Next steps:"
echo "  1. Verify frontend at https://sd-example.sch.id"
echo "  2. Check API at https://api.sd-example.sch.id"
echo "  3. Monitor logs: pm2 logs school-profile-api"
