# Mission Control Dashboard

**Amadu Kamara's Command Center** for managing 7 income streams, 6 AI agents, and tracking progress toward financial freedom.

## 🎯 Mission Statement

> "Build automated systems that generate wealth without requiring my presence, so I can provide financial security and unlimited options for my future family."

## ✨ Features

### 13 Dashboard Screens

1. **Task Board** - Kanban board for all agent tasks with live activity feed
2. **Projects** - Track 7 income streams with progress bars
3. **Team** - Overview of all 6 AI agents and their roles
4. **Calendar** - Display all cron jobs and scheduled tasks
5. **Docs** - Repository of all agent deliverables
6. **Income Dashboard** - Real-time MRR tracking with graphs
7. **Stream Status Board** - Status and progress for each income stream
8. **Idea Capture** - Prioritized queue of ideas (impact/time ratio)
9. **Time Budget** - Weekly hours allocation tracker
10. **Agent Efficiency** - Performance metrics for each agent
11. **Client Pipeline** - Sales funnel for Agency Stream #1
12. **Why Board** - Family vision and motivation
13. **Automation Ideas** - Backlog for AI automation business

### Core Features

- 🔐 Authentication (username/password)
- 🌙 Dark mode UI (Linear-inspired design)
- 📊 Real-time data updates (5s refresh)
- 📱 Fully responsive (mobile + desktop)
- 🤖 Nightly intelligence reports (23:59 UTC)
- 📈 Charts and visualizations
- ✅ Full CRUD operations for all entities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to project directory
cd mission-control

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env and set:
# - DATABASE_URL (defaults to SQLite)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
# - DEFAULT_USERNAME and DEFAULT_PASSWORD

# Initialize database
npx prisma migrate dev --name init
npx prisma generate

# Seed database with initial data
npx ts-node scripts/init-db.ts

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Default Login

- **Username:** `amadu` (or your DEFAULT_USERNAME from .env)
- **Password:** `password123` (or your DEFAULT_PASSWORD from .env)

**⚠️ CHANGE THE DEFAULT PASSWORD IMMEDIATELY AFTER FIRST LOGIN**

## 📦 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - DATABASE_URL (use PostgreSQL for production)
# - NEXTAUTH_URL (your production URL)
# - NEXTAUTH_SECRET
# - DEFAULT_USERNAME
# - DEFAULT_PASSWORD

# Run database migrations in Vercel
# (Set up a postbuild script or run manually)
```

### Production Database

For production, use PostgreSQL instead of SQLite:

1. Create a PostgreSQL database (Vercel Postgres, Railway, Supabase, etc.)
2. Update `DATABASE_URL` in `.env` to your PostgreSQL connection string
3. Update `prisma/schema.prisma`: change `provider = "sqlite"` to `provider = "postgresql"`
4. Run `npx prisma migrate dev` to apply schema
5. Run `npx ts-node scripts/init-db.ts` to seed data

## 🤖 Nightly Intelligence Task

The dashboard includes an automated intelligence task that runs at 23:59 UTC every night:

```bash
# Run manually
npx ts-node scripts/nightly-intelligence.ts

# Schedule with cron (on your server)
59 23 * * * cd /path/to/mission-control && npx ts-node scripts/nightly-intelligence.ts
```

The task analyzes:
- Dashboard gaps vs mission statement
- New tools/features to add
- Income stream optimization opportunities
- Emerging market opportunities
- Agent performance patterns

Reports are saved to the **Docs** section for morning review.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Prisma + SQLite (dev) / PostgreSQL (prod)
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📁 Project Structure

```
mission-control/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard screens (13 pages)
│   ├── login/              # Login page
│   ├── api/                # API routes (future)
│   └── ...
├── pages/api/              # API routes (current)
│   ├── auth/               # NextAuth
│   ├── tasks.ts            # Task CRUD
│   ├── streams.ts          # Income streams CRUD
│   └── ...
├── components/             # Reusable components
│   └── DashboardLayout.tsx
├── lib/                    # Utilities
│   ├── prisma.ts           # Database client
│   ├── auth.ts             # Auth config
│   ├── api.ts              # API client
│   └── utils.ts            # Helper functions
├── prisma/
│   └── schema.prisma       # Database schema
├── scripts/
│   ├── init-db.ts          # Database initialization
│   └── nightly-intelligence.ts  # Intelligence task
└── public/                 # Static assets
```

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma Studio (database GUI)
npx prisma studio

# Database migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## 📊 API Endpoints

All endpoints require authentication.

- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/streams` - List income streams
- `POST /api/streams` - Create stream
- ... (similar for all entities)

## 🎨 Customization

### Adding OpenClaw Integration

To connect to your OpenClaw API:

1. Add OpenClaw API credentials to `.env`:
   ```
   OPENCLAW_API_URL=http://localhost:8080
   OPENCLAW_API_KEY=your-api-key
   ```

2. Create API integration functions in `lib/openclaw.ts`
3. Call OpenClaw API from your pages/API routes

### Adding New Screens

1. Create new page in `app/dashboard/your-screen/page.tsx`
2. Add route to navigation in `components/DashboardLayout.tsx`
3. Create corresponding API routes in `pages/api/` if needed

## 🐛 Troubleshooting

### "Invalid credentials" on login
- Check `DEFAULT_USERNAME` and `DEFAULT_PASSWORD` in `.env`
- Run `npx ts-node scripts/init-db.ts` to recreate user

### Database errors
- Delete `prisma/dev.db` and run `npx prisma migrate dev` to reset
- Check that `DATABASE_URL` is correctly set

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (requires 18+)

## 📝 License

Private project for Amadu Kamara.

## 🤝 Support

For issues or questions, contact the development team.

---

**Built with 💙 by BYTE**

_Your mission control, your way._
# Trigger redeploy
