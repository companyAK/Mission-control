import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Initializing database...')

  const username = process.env.DEFAULT_USERNAME || 'amadu'
  const password = process.env.DEFAULT_PASSWORD || 'password123'

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })

  if (existingUser) {
    console.log('✅ User already exists')
  } else {
    const hashedPassword = await hash(password, 12)
    
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
    
    console.log(`✅ Created user: ${username}`)
  }

  // Create sample income stream
  const streamCount = await prisma.incomeStream.count()
  if (streamCount === 0) {
    await prisma.incomeStream.create({
      data: {
        name: 'Growth Agency',
        description: 'Service business: websites + ads for local businesses',
        status: 'Executing',
        progress: 25,
        mrr: 500,
        focus: true,
      },
    })
    console.log('✅ Created sample income stream')
  }

  // Create sample cron job for nightly intelligence
  const cronCount = await prisma.cronJob.count()
  if (cronCount === 0) {
    await prisma.cronJob.create({
      data: {
        name: 'Nightly Intelligence Report',
        description: 'Research dashboard gaps, optimization opportunities, and emerging trends',
        schedule: '0 23 59 * * *',
        agent: 'NOVA',
        isActive: true,
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })
    console.log('✅ Created nightly intelligence cron job')
  }

  console.log('🎉 Database initialization complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
