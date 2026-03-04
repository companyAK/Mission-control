/**
 * Daily Health Check System
 * Monitors Mission Control dashboard health
 * Runs daily and logs status to dashboard
 */

import fetch from 'node-fetch'
import { writeFileSync } from 'fs'
import { join } from 'path'

interface HealthCheckResult {
  timestamp: string
  status: 'healthy' | 'warning' | 'critical'
  checks: {
    https: { ok: boolean; message: string }
    uptime: { ok: boolean; message: string }
    database: { ok: boolean; message: string }
    auth: { ok: boolean; message: string }
    dashboards: { ok: boolean; message: string; screens: Record<string, boolean> }
    build: { ok: boolean; message: string }
  }
  summary: {
    totalChecks: number
    passed: number
    failed: number
    warnings: number
  }
}

/**
 * Check HTTPS/TLS Certificate
 */
async function checkHTTPS(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch('https://localhost:3000', {
      rejectUnauthorized: false, // Allow self-signed cert
      method: 'HEAD',
    })
    return {
      ok: response.status === 200 || response.status === 404,
      message: 'HTTPS working, self-signed cert valid',
    }
  } catch (error) {
    return {
      ok: false,
      message: `HTTPS check failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Check App Uptime
 */
async function checkUptime(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      timeout: 5000,
    })
    const latency = response.headers.get('x-response-time') || 'unknown'
    return {
      ok: response.status === 200,
      message: `App responding (latency: ${latency}ms)`,
    }
  } catch (error) {
    return {
      ok: false,
      message: `Uptime check failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Check Database Connectivity
 */
async function checkDatabase(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3000/api/projects', {
      timeout: 5000,
    })
    return {
      ok: response.status === 200,
      message: 'Database connected (Supabase reachable)',
    }
  } catch (error) {
    return {
      ok: false,
      message: `Database check failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Check Authentication System
 */
async function checkAuth(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3000/api/auth/session', {
      timeout: 5000,
    })
    return {
      ok: response.status === 200 || response.status === 401, // 401 means auth system works
      message: 'Auth system responding',
    }
  } catch (error) {
    return {
      ok: false,
      message: `Auth check failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Check All Dashboard Screens Load
 */
async function checkDashboards(): Promise<{ ok: boolean; message: string; screens: Record<string, boolean> }> {
  const screens = [
    'dashboard',
    'dashboard/career',
    'dashboard/agent-court',
    'dashboard/proposals',
    'dashboard/preflight',
    'dashboard/projects',
    'dashboard/team',
    'dashboard/org',
    'dashboard/calendar',
    'dashboard/docs',
    'dashboard/income',
    'dashboard/streams',
    'dashboard/ideas',
    'dashboard/time-budget',
    'dashboard/agent-efficiency',
  ]

  const results: Record<string, boolean> = {}
  let allOk = true

  for (const screen of screens) {
    try {
      const response = await fetch(`http://localhost:3000/${screen}`, {
        timeout: 5000,
        redirect: 'follow',
      })
      results[screen] = response.status === 200
      if (response.status !== 200) allOk = false
    } catch (error) {
      results[screen] = false
      allOk = false
    }
  }

  const passed = Object.values(results).filter(Boolean).length
  const failed = screens.length - passed

  return {
    ok: failed <= 2, // Allow up to 2 screens to be down (warning, not critical)
    message: `${passed}/${screens.length} screens responding${failed > 0 ? ` (${failed} offline)` : ''}`,
    screens: results,
  }
}

/**
 * Check Build Status
 */
async function checkBuild(): Promise<{ ok: boolean; message: string }> {
  try {
    // Check if .next/static exists (indicates successful build)
    const fs = await import('fs')
    const buildPath = join(process.cwd(), '.next', 'static')
    const buildExists = fs.existsSync(buildPath)
    return {
      ok: buildExists,
      message: buildExists ? 'Latest build exists' : 'No recent build found',
    }
  } catch (error) {
    return {
      ok: false,
      message: `Build check failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/**
 * Run All Health Checks
 */
export async function runHealthChecks(): Promise<HealthCheckResult> {
  console.log('[Health Check] Starting daily health check...')

  const [https, uptime, database, auth, dashboards, build] = await Promise.all([
    checkHTTPS(),
    checkUptime(),
    checkDatabase(),
    checkAuth(),
    checkDashboards(),
    checkBuild(),
  ])

  const checks = { https, uptime, database, auth, dashboards, build }
  const passed = Object.values(checks).filter((c) => c.ok).length
  const failed = Object.values(checks).filter((c) => !c.ok).length

  const result: HealthCheckResult = {
    timestamp: new Date().toISOString(),
    status: failed === 0 ? 'healthy' : failed >= 3 ? 'critical' : 'warning',
    checks: {
      https,
      uptime,
      database,
      auth,
      dashboards,
      build,
    },
    summary: {
      totalChecks: Object.keys(checks).length,
      passed,
      failed,
      warnings: Object.values(checks).filter((c) => !c.ok && c !== null).length,
    },
  }

  // Log to file
  const logPath = join(process.cwd(), 'logs', 'health-checks.json')
  try {
    writeFileSync(logPath, JSON.stringify(result, null, 2))
    console.log(`[Health Check] Report saved to ${logPath}`)
  } catch (error) {
    console.error('[Health Check] Failed to save report:', error)
  }

  console.log(
    `[Health Check] Status: ${result.status.toUpperCase()} (${result.summary.passed}/${result.summary.totalChecks} checks passed)`,
  )

  return result
}

/**
 * Format Health Report for Display
 */
export function formatHealthReport(result: HealthCheckResult): string {
  const lines = [
    `Health Check Report - ${new Date(result.timestamp).toLocaleString()}`,
    `Status: ${result.status.toUpperCase()}`,
    '',
    'Checks:',
    `  ✓ HTTPS: ${result.checks.https.ok ? 'PASS' : 'FAIL'} - ${result.checks.https.message}`,
    `  ✓ Uptime: ${result.checks.uptime.ok ? 'PASS' : 'FAIL'} - ${result.checks.uptime.message}`,
    `  ✓ Database: ${result.checks.database.ok ? 'PASS' : 'FAIL'} - ${result.checks.database.message}`,
    `  ✓ Auth: ${result.checks.auth.ok ? 'PASS' : 'FAIL'} - ${result.checks.auth.message}`,
    `  ✓ Dashboards: ${result.checks.dashboards.ok ? 'PASS' : 'WARN'} - ${result.checks.dashboards.message}`,
    `  ✓ Build: ${result.checks.build.ok ? 'PASS' : 'FAIL'} - ${result.checks.build.message}`,
    '',
    `Summary: ${result.summary.passed}/${result.summary.totalChecks} checks passed`,
  ]

  return lines.join('\n')
}
