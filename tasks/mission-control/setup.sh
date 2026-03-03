#!/bin/bash

# Mission Control Dashboard - Quick Setup Script
# Run this after cloning the repository

echo "🚀 Mission Control Dashboard - Setup"
echo "===================================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Please install Node.js first."
    echo "   Visit: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔐 Creating .env file..."
    cp .env.example .env
    
    # Generate NEXTAUTH_SECRET
    SECRET=$(openssl rand -base64 32 2>/dev/null || echo "CHANGE_THIS_SECRET_$(date +%s)")
    
    # Update .env with generated secret (works on macOS and Linux)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|your-secret-key-here-generate-a-random-string|${SECRET}|g" .env
    else
        # Linux
        sed -i "s|your-secret-key-here-generate-a-random-string|${SECRET}|g" .env
    fi
    
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and set your username/password!"
    echo "   nano .env"
    echo ""
    read -p "Press Enter to continue once you've set your credentials..."
else
    echo "✅ .env file already exists"
fi
echo ""

# Initialize database
echo "🗄️  Initializing database..."
npx prisma migrate dev --name init
if [ $? -ne 0 ]; then
    echo "❌ Failed to run database migrations"
    exit 1
fi
echo "✅ Database migrations completed"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client generated"
echo ""

# Seed database
echo "🌱 Seeding database with initial data..."
npx ts-node scripts/init-db.ts
if [ $? -ne 0 ]; then
    echo "⚠️  Failed to seed database. You can run this manually later:"
    echo "   npx ts-node scripts/init-db.ts"
fi
echo ""

# Done!
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "🎉 Mission Control Dashboard is ready!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Default login (change these!):"
echo "  Username: amadu"
echo "  Password: password123"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Setup and usage guide"
echo "  - DEPLOYMENT.md - Deployment instructions"
echo "  - PROJECT_SUMMARY.md - Complete feature list"
echo ""
echo "Happy building! 🚀"
