# 🚀 Vercel Deployment Instructions

## ⚠️ CRITICAL: Do These Steps BEFORE Deploying

### Step 1: Set Up Supabase Database

1. Go to [Supabase](https://supabase.com)
2. Create a new project or use existing one
3. Navigate to **Settings → Database**
4. Copy the **Connection string** (URI format)
5. It should look like:
   ```
   postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
   ```

### Step 2: Configure Vercel Environment Variables

Go to your Vercel project → **Settings → Environment Variables**

Add these 5 variables (apply to Production, Preview, and Development):

```
DATABASE_URL
postgresql://postgres.[your-ref]:[your-password]@[your-host].supabase.com:5432/postgres
```

```
NEXTAUTH_URL
https://[your-app-name].vercel.app
```

```
NEXTAUTH_SECRET
[Generate with: openssl rand -base64 32]
```

```
DEFAULT_USERNAME
amadu
```

```
DEFAULT_PASSWORD
[Choose a secure password]
```

**IMPORTANT:** 
- Replace `[your-ref]`, `[your-password]`, `[your-host]` with actual values from Supabase
- Replace `[your-app-name]` with your actual Vercel app name
- Generate a NEW `NEXTAUTH_SECRET` - don't use an example!

### Step 3: Push Code to GitHub

The fixed code is ready. Just push:

```bash
git add .
git commit -m "Fix: Convert SQLite to PostgreSQL for production"
git push origin main
```

This will trigger Vercel to auto-deploy.

### Step 4: Run Database Migrations (ONE TIME ONLY)

After the first deployment succeeds:

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login and link project
vercel login
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations against production database
DATABASE_URL="[your-supabase-url]" npx prisma migrate deploy

# Seed initial user
DATABASE_URL="[your-supabase-url]" npx ts-node scripts/init-db.ts
```

**Option B: Using Supabase SQL Editor**

1. Go to Supabase → SQL Editor
2. Copy the contents of `prisma/migrations/20260303224500_init_postgres/migration.sql`
3. Paste and run it
4. Manually insert first user (see below)

**Manual User Insert:**
```sql
INSERT INTO "User" (id, username, password, "createdAt", "updatedAt")
VALUES (
  'cm123456789',
  'amadu',
  '$2a$10$[bcrypt-hash-of-your-password]',
  NOW(),
  NOW()
);
```

To generate bcrypt hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### Step 5: Test Your Deployment

1. Visit `https://[your-app-name].vercel.app`
2. You should see the login page
3. Login with your DEFAULT_USERNAME and DEFAULT_PASSWORD
4. You should be redirected to the dashboard
5. Dashboard should show 6 agent cards and empty state

---

## 🐛 Troubleshooting

### Issue: Still getting 404s

**Check Vercel Logs:**
- Go to Vercel Dashboard → Deployments → [Latest Deployment] → Logs
- Look for database connection errors
- Verify DATABASE_URL is correct

**Common mistakes:**
- DATABASE_URL missing `postgresql://` prefix
- Password in URL not URL-encoded (special chars need encoding)
- NEXTAUTH_URL doesn't match actual domain
- Forgot to run migrations

### Issue: "Invalid credentials" on login

- Verify you ran `init-db.ts` script OR manually created user
- Check that DEFAULT_USERNAME and DEFAULT_PASSWORD match what you're typing
- Password must be bcrypt-hashed in database

### Issue: Build succeeds but pages crash

- Check runtime logs in Vercel dashboard
- Likely a DATABASE_URL issue
- Make sure Prisma Client was regenerated (runs in postinstall)

---

## 🎯 Expected Behavior After Fix

✅ Build completes successfully (green checkmark in Vercel)  
✅ Visit homepage → redirects to `/login`  
✅ Login page loads with username/password form  
✅ After login → redirects to `/dashboard`  
✅ Dashboard shows:
  - Top stats cards
  - 6 agent cards (ARIA, NOVA, BYTE, PULSE, QUINN, ECHO)
  - Income streams section (empty initially)
  - Task board (empty initially)
  - No errors in browser console

---

## 📊 What Changed From Original

| Component | Before | After | Why |
|-----------|--------|-------|-----|
| Database Provider | SQLite | PostgreSQL | Vercel needs PostgreSQL |
| DATABASE_URL | `file:./dev.db` | `postgresql://...` | Production database |
| Migrations | SQLite SQL | PostgreSQL SQL | Syntax differences |
| Build Script | Includes migrate | Generate only | Safer for Vercel |
| NEXTAUTH_URL | localhost | Production URL | Auth redirects |

---

## 🔐 Security Notes

- **NEVER commit .env file** (it's in .gitignore)
- Store secrets ONLY in Vercel Environment Variables
- Rotate NEXTAUTH_SECRET if exposed
- Use strong password for DEFAULT_PASSWORD
- After first login, consider changing password via Supabase

---

## 📞 Support

If something goes wrong:
1. Check Vercel deployment logs
2. Check Vercel function logs (Runtime Logs)
3. Check browser console for errors
4. Verify all 5 environment variables are set correctly
5. Confirm migrations ran successfully

**Quick verification:**
```bash
# Check if tables exist in Supabase
# Go to Supabase → Table Editor
# You should see: User, Task, IncomeStream, Project, Client, etc.
```

---

**Deployment Status: READY TO DEPLOY ✅**

Push to GitHub and follow steps 1-5 above!
