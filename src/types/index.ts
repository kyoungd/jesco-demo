export interface Portfolio {
  asOf: string
  totals: {
    portfolioValue: number
    cash: number
    fixedIncome: number
    carbonCredits: number
  }
  performanceToday: {
    abs: number
    pct: number
  }
}

export interface Position {
  symbol: string
  description: string
  quantity: number
  price: number
  marketValue: number
  strategyTag: string
}

export interface Positions {
  positions: Position[]
}

export interface Activity {
  movements: Array<{
    type: 'transfer' | 'profit'
    title: string
    note: string
    amount: number
    when: string
  }>
}

export interface Performance {
  mtd: { pct: number; pnl: number; label: string }
  ytd: { pct: number; pnl: number; label: string }
  sinceInception: { pct: number; pnl: number; since: string }
  annualized: { pct: number; benchmarkPct: number }
  history?: Array<{
    period: string
    returnPct: number
    pnl: number
    excessPct: number
    volPct: number
    sharpe: number
  }>
}

export interface Trade {
  executedAt: string
  instrument: string
  side: 'BUY' | 'SELL'
  quantity: number
  price: number
  notional: number
  venue: string
  fees: number
}

export interface Trades {
  filters: { range: string }
  summary: { tradeVolume: number; tradeCount: number; avgPerTrade: number }
  rows: Trade[]
}

export interface Commission {
  config: {
    ratePct: number
    override: { payeeAccountId: string; pctOfGross: number }
  }
  snapshots: Array<{
    period: string
    earned: number
    paid: number
    retained: number
  }>
  byTrade: Array<{
    tradeId: string
    baseNotional: number
    calcGross: number
    paidOut: number
    retained: number
  }>
  distribution: { retainedPct: number; paidPct: number }
}

export interface Bond {
  isin: string
  issuer: string
  couponPct: number
  maturity: string
  rating: string
  maturityBucket: string
  quantity: number
  cleanPrice: number
  marketValue: number
}

export interface FixedIncome {
  asOf: string
  summary: {
    total: number
    pnlToday: number
    yieldPct: number
    modifiedDuration: number
    avgRating: string
  }
  bonds: Bond[]
}

export interface Account {
  accountId: string
  portal: 'jesco' | 'saracoti'
  displayName: string
  lastLoginAt: string
}

export type Portal = 'jesco' | 'saracoti'