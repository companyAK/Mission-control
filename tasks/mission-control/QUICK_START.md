# Mission Control - Quick Start Guide

**Welcome to your command center, Amadu! 🚀**

This is your one-page guide to getting started immediately.

---

## 🏃 Quick Setup (5 Minutes)

### Option 1: Automatic Setup (Recommended)

```bash
cd /root/.openclaw/workspace/tasks/mission-control
./setup.sh
```

That's it! Follow the prompts, then:

```bash
npm run dev
```

Open `http://localhost:3000` → Log in → Start building!

---

### Option 2: Manual Setup

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
nano .env  # Set your username/password

# 3. Database
npx prisma migrate dev --name init
npx prisma generate
npx ts-node scripts/init-db.ts

# 4. Run
npm run dev
```

---

## 🔑 First Login

**URL:** `http://localhost:3000`

**Default Credentials:**
- Username: `amadu`
- Password: `password123` (or whatever you set in `.env`)

**⚠️ CHANGE YOUR PASSWORD IMMEDIATELY**
(We'll add a password change feature - for now, update in the database)

---

## 🎯 Your First 15 Minutes

### Step 1: Add Your Streams (2 min)

**Projects screen → Add your 7 income streams:**

1. Growth Agency (website + ads for local businesses)
2. AI Automation Business
3. [Your Stream #3]
4. [Your Stream #4]
5. [Your Stream #5]
6. [Your Stream #6]
7. [Your Stream #7]

For each, set:
- Name
- Description
- Status (Planning/Executing/Revenue/Scaling)
- Current MRR (if any)

---

### Step 2: Create Your First Tasks (5 min)

**Task Board → Add tasks for this week:**

Examples:
- **NOVA:** Research competitors for Growth Agency
- **ARIA:** Design landing page template
- **BYTE:** Build client onboarding automation
- **PULSE:** Plan social media strategy for agency
- **QUINN:** Write 5 blog post ideas
- **ECHO:** Humanize existing sales copy

Assign to agents, set priority (High/Medium/Low)

---

### Step 3: Set Your Time Budget (3 min)

**Time Budget screen → Allocate this week's hours:**

- Full-time Job: 40h (fixed)
- Stream #1 (Agency): 15h
- Stream #2 (Automation): 10h
- Learning/Research: 5h
- Personal/Family: 2h

Total available for hustle: 72h (after sleep + job)

---

### Step 4: Capture Your Ideas (5 min)

**Ideas screen → Brain dump everything:**

Add 5-10 ideas floating in your head:
- Impact score (1-10): How big is the opportunity?
- Time estimate (hours): How long to execute?
- Priority auto-calculates (Impact / Time)

System prioritizes high-impact, low-time ideas automatically!

---

## 📊 Daily Routine

### Morning (5 min)
1. Open **Dashboard** → Check Task Board
2. Read **Docs** → Review last night's intelligence report
3. Open **Why Board** → Remember your mission
4. Check **Income** → Track progress toward $10k/mo

### Throughout Day
- Update task statuses as you work
- Capture ideas immediately (Ideas screen)
- Add clients to pipeline when they appear
- Log wins in Projects screen

### Evening (5 min)
1. Move completed tasks to "Done"
2. Add tomorrow's top 3 priorities to backlog
3. Update time budget if needed
4. Check Agent Efficiency for performance insights

---

## 🎯 Your 13 Screens Explained

| Screen | When to Use |
|--------|-------------|
| **Task Board** | Daily - Manage agent work |
| **Projects** | Weekly - Track stream progress |
| **Team** | When delegating - See who does what |
| **Calendar** | Weekly - Check scheduled tasks |
| **Docs** | Morning - Read intelligence reports |
| **Income** | Daily - Track MRR growth |
| **Streams** | Weekly - Monitor stream status |
| **Ideas** | Anytime - Capture + prioritize ideas |
| **Time Budget** | Weekly - Plan time allocation |
| **Efficiency** | Weekly - Review agent performance |
| **Pipeline** | Daily (for Agency) - Manage clients |
| **Why Board** | When tired - Remember your mission |
| **Automation** | Weekly - Brainstorm Stream #2 ideas |

---

## 💡 Pro Tips

### 1. Use the Dashboard DAILY
Set a reminder: 9 AM and 6 PM
- Morning: Plan day
- Evening: Log progress

### 2. Intelligence Reports Are Gold
Every morning, read the nightly report in Docs
It analyzes your progress and suggests improvements

### 3. Prioritize by MRR Impact
Focus on streams generating revenue FIRST
Planning streams can wait

### 4. Track Everything
The more data you log, the smarter the system gets
- Agent performance
- Client sources
- Task completion times

### 5. Use the Why Board
When you're grinding at 11 PM:
Open Why Board → Remember you're building freedom for your family

---

## 🚀 Next Steps (After Setup)

### Week 1: Foundation
- [ ] Add all 7 income streams
- [ ] Create tasks for this week
- [ ] Add 3 clients to pipeline (if applicable)
- [ ] Set time budget
- [ ] Capture 10+ ideas

### Week 2: Optimize
- [ ] Review first intelligence report
- [ ] Track agent efficiency
- [ ] Update MRR for streams
- [ ] Add automation ideas
- [ ] Adjust time budget based on reality

### Week 3: Scale
- [ ] Implement top 3 ideas
- [ ] Review client conversion rates
- [ ] Optimize low-performing streams
- [ ] Build repeatable workflows
- [ ] Celebrate first wins!

---

## 🆘 Common Issues

### "Invalid credentials"
→ Check `.env` file: `DEFAULT_USERNAME` and `DEFAULT_PASSWORD`
→ Re-run: `npx ts-node scripts/init-db.ts`

### Database errors
→ Delete `prisma/dev.db` and re-run setup

### Page not updating
→ Data refreshes every 5 seconds automatically
→ Or refresh browser manually

### Can't find a feature
→ Check **FEATURES.md** for complete list
→ Everything is in the sidebar navigation

---

## 📚 Documentation Quick Reference

| File | What's Inside |
|------|---------------|
| **QUICK_START.md** | This file - Get started fast |
| **README.md** | Complete setup & usage guide |
| **FEATURES.md** | Every feature explained |
| **PROJECT_SUMMARY.md** | Technical overview |
| **DEPLOYMENT.md** | How to deploy to production |

---

## 🎯 Your Mission (Never Forget)

> "Build automated systems that generate wealth without requiring my presence, so I can provide financial security and unlimited options for my future family."

Every task. Every stream. Every hour invested.  
It's all for **THEM**. Your future kids. Financial freedom. Options.

---

## 🔥 Motivation Reminders

**When you're tired:**
> "This grind is temporary. Financial freedom is permanent."

**When you're stuck:**
> "Every automated system I build brings my family closer to freedom."

**When you're winning:**
> "Keep building. The goal isn't just money — it's OPTIONS for the people I love."

---

## 📞 Need Help?

**Documentation:**
- Check README.md troubleshooting section
- Read FEATURES.md for "how does X work?"
- Review DEPLOYMENT.md for hosting issues

**Technical Issues:**
- Clear browser cache
- Restart dev server
- Check console for errors
- Re-run database migrations

**Questions?**
All answers are in the docs. Read them. They're comprehensive.

---

## ✅ Setup Checklist

Before you start working:

- [ ] Dashboard is running (`npm run dev`)
- [ ] You can log in
- [ ] All 13 screens are accessible
- [ ] You've added at least 1 income stream
- [ ] You've created at least 1 task
- [ ] You've read the Why Board
- [ ] You understand your mission

**All done? GO BUILD. 🚀**

---

## 🎓 Learn As You Go

You don't need to understand everything today.

**Just start using it:**
1. Add tasks
2. Track progress
3. Capture ideas
4. Update streams

The more you use it, the more powerful it becomes.

**This is YOUR command center. Make it yours.**

---

**Built by BYTE. Ready for Amadu. Let's build that empire. 💻**

---

## One-Line Setup

```bash
cd mission-control && ./setup.sh && npm run dev
```

**That's it. Now go change your family's future. 🚀**
