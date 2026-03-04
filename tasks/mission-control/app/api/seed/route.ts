import {
  seedTasks,
  seedProjects,
  seedTeam,
  seedIdeas,
  seedPipeline,
  seedIncome,
} from '@/lib/seed-data'

export async function GET() {
  return Response.json({
    tasks: seedTasks,
    projects: seedProjects,
    team: seedTeam,
    ideas: seedIdeas,
    pipeline: seedPipeline,
    income: seedIncome,
  })
}
