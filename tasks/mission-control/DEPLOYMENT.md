# Deployment Guide - Mission Control Dashboard

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
cd mission-control
git init
git add .
git commit -m "Initial commit: Mission Control Dashboard"

# Push to GitHub (create repo first on github.com)
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or specify if in subdirectory)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Step 3: Set Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
DEFAULT_USERNAME=amadu
DEFAULT_PASSWORD=<your-secure-password>
```

#### Database Setup (PostgreSQL)

For production, you need PostgreSQL. Options:

1. **Vercel Postgres** (recommended)
   - Go to Storage → Create Database → Postgres
   - Copy connection string to `DATABASE_URL`

2. **Railway.app**
   - Create PostgreSQL database
   - Copy connection string

3. **Supabase**
   - Create project
   - Get connection string from Settings → Database

### Step 4: Update Prisma Schema

Before deploying, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

Commit this change:
```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push
```

### Step 5: Run Database Migrations

In Vercel dashboard, after deployment:

1. Go to **Settings → General → Build & Development Settings**
2. Add **Install Command:**
   ```
   npm install && npx prisma generate && npx prisma migrate deploy
   ```

OR run manually:

```bash
# Connect to your production database locally
DATABASE_URL="your-production-url" npx prisma migrate deploy
DATABASE_URL="your-production-url" npx ts-node scripts/init-db.ts
```

### Step 6: Redeploy

Click **Deploy → Redeploy** in Vercel dashboard.

Your dashboard will be live at `https://your-app.vercel.app`!

---

## 🖥️ Deploy to Your Own Server (VPS/Dedicated)

### Prerequisites

- Ubuntu/Debian server with SSH access
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy
- Domain name (optional)

### Step 1: Set Up Server

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib
```

### Step 2: Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/mission-control.git
cd mission-control

# Install dependencies
npm install

# Set up environment variables
sudo nano .env
# Add all required env vars

# Update Prisma schema to use PostgreSQL
# (Same as Step 4 in Vercel guide)

# Run migrations
npx prisma migrate deploy
npx ts-node scripts/init-db.ts

# Build for production
npm run build

# Start with PM2
pm2 start npm --name "mission-control" -- start
pm2 save
pm2 startup
```

### Step 3: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/mission-control
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/mission-control /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Set Up SSL (Optional but Recommended)

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Step 5: Schedule Nightly Intelligence Task

```bash
# Edit crontab
crontab -e

# Add this line (runs at 23:59 UTC every night)
59 23 * * * cd /var/www/mission-control && npx ts-node scripts/nightly-intelligence.ts >> /var/log/mission-control-intelligence.log 2>&1
```

---

## 🐳 Deploy with Docker (Advanced)

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/missioncontrol
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=missioncontrol
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy

```bash
# Build and run
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx ts-node scripts/init-db.ts
```

---

## 🔄 Updates and Maintenance

### Updating the Application

**Vercel:**
Just push to GitHub - auto-deploys!

**VPS/Server:**
```bash
cd /var/www/mission-control
git pull
npm install
npm run build
pm2 restart mission-control
```

### Database Backups

**PostgreSQL Backup:**
```bash
# Backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20260303.sql
```

### Monitoring

**Check logs:**
```bash
# Vercel: View in dashboard

# PM2:
pm2 logs mission-control

# Nginx:
sudo tail -f /var/log/nginx/access.log
```

---

## 🐛 Common Issues

### Build fails with "Cannot find module"
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next && npm run build`

### Database connection errors
- Check `DATABASE_URL` is correct
- Ensure database is running
- Check firewall rules

### "Invalid credentials" after deployment
- Run `npx ts-node scripts/init-db.ts` on production
- Check `DEFAULT_USERNAME` and `DEFAULT_PASSWORD` are set

---

**Need help?** Check the main README.md or open an issue.
