import { promises as fs } from 'fs'
import path from 'path'
import { Portfolio, Activity, Performance, Trades, Commission, FixedIncome, Portal } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')

export async function getPortfolioData(portal: Portal, accountId: string): Promise<Portfolio | null> {
  try {
    const filePath = path.join(DATA_DIR, portal, accountId, 'portfolio.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load portfolio data for ${portal}/${accountId}:`, error)
    return null
  }
}

export async function getActivityData(portal: Portal, accountId: string): Promise<Activity | null> {
  try {
    const filePath = path.join(DATA_DIR, portal, accountId, 'activity.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load activity data for ${portal}/${accountId}:`, error)
    return null
  }
}

export async function getPerformanceData(portal: Portal, accountId: string): Promise<Performance | null> {
  try {
    const filePath = path.join(DATA_DIR, portal, accountId, 'performance.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load performance data for ${portal}/${accountId}:`, error)
    return null
  }
}

export async function getTradesData(portal: Portal, accountId: string): Promise<Trades | null> {
  try {
    const filePath = path.join(DATA_DIR, portal, accountId, 'trades.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load trades data for ${portal}/${accountId}:`, error)
    return null
  }
}

export async function getCommissionData(portal: Portal, accountId: string): Promise<Commission | null> {
  if (portal !== 'saracoti') return null
  
  try {
    const filePath = path.join(DATA_DIR, portal, accountId, 'commissions.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load commission data for ${portal}/${accountId}:`, error)
    return null
  }
}

export async function getFixedIncomeData(portal: Portal, accountId: string): Promise<FixedIncome | null> {
  try {
    const filePath = path.join(DATA_DIR, portal, accountId, 'fixed-income.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load fixed income data for ${portal}/${accountId}:`, error)
    return null
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(pct: number): string {
  const formatted = (pct * 100).toFixed(2)
  const sign = pct >= 0 ? '+' : ''
  return `${sign}${formatted}%`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}