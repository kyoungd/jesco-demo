import { Portfolio, Activity, Performance, Trades, Commission, FixedIncome, Portal, Positions } from '@/types'

const API_BASE_URL = process.env.JESCO_API_URL
const API_SERVICE_KEY = process.env.JESCO_API_SERVICE_KEY

if (!API_BASE_URL || !API_SERVICE_KEY) {
  throw new Error('Missing required environment variables: JESCO_API_URL and JESCO_API_SERVICE_KEY')
}

async function apiCall<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      headers: {
        'x-api-key': API_SERVICE_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    return null
  }
}

export async function getPortfolioData(portal: Portal, accountId: string): Promise<Portfolio | null> {
  return await apiCall<Portfolio>(`/accounts/${portal}/${accountId}/portfolio`)
}

export async function getActivityData(portal: Portal, accountId: string): Promise<Activity | null> {
  return await apiCall<Activity>(`/accounts/${portal}/${accountId}/activity`)
}

export async function getPerformanceData(portal: Portal, accountId: string): Promise<Performance | null> {
  return await apiCall<Performance>(`/accounts/${portal}/${accountId}/performance`)
}

export async function getTradesData(portal: Portal, accountId: string): Promise<Trades | null> {
  return await apiCall<Trades>(`/accounts/${portal}/${accountId}/trades`)
}

export async function getCommissionData(portal: Portal, accountId: string): Promise<Commission | null> {
  if (portal !== 'saracoti') return null
  return await apiCall<Commission>(`/accounts/${portal}/${accountId}/commissions`)
}

export async function getFixedIncomeData(portal: Portal, accountId: string): Promise<FixedIncome | null> {
  return await apiCall<FixedIncome>(`/accounts/${portal}/${accountId}/fixed-income`)
}

export async function getPositionsData(portal: Portal, accountId: string): Promise<Positions | null> {
  return await apiCall<Positions>(`/accounts/${portal}/${accountId}/positions`)
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