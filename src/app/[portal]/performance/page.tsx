import DashboardLayout from '@/components/DashboardLayout'
import { getPerformanceData, formatCurrency, formatPercentage, formatDate } from '@/lib/data'
import { Portal } from '@/types'

interface PerformancePageProps {
  params: { portal: Portal }
  searchParams: { accountId?: string }
}

export default async function PerformancePage({ params, searchParams }: PerformancePageProps) {
  const { portal } = await params
  const resolvedSearchParams = await searchParams
  const accountId = resolvedSearchParams.accountId || 'JESCO001'

  const performanceData = await getPerformanceData(portal, accountId)

  const pageTitle = portal === 'saracoti' ? 'Saracoti Performance Reports' : 'JESCO Performance Reports'
  const pageDescription = 'Comprehensive performance analytics and historical returns'

  if (!performanceData) {
    return (
      <DashboardLayout portal={portal} accountId={accountId}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Not Available</h2>
          <p className="text-gray-600">Performance data could not be loaded for this account.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout portal={portal} accountId={accountId}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-gray-600">{pageDescription}</p>
        </div>

        {/* Performance Summary Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* MTD Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Month to Date</p>
                <p className="text-sm text-gray-500">{performanceData.mtd.label}</p>
                <p className={`text-2xl font-bold mt-2 ${
                  performanceData.mtd.pct >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(performanceData.mtd.pct)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatCurrency(performanceData.mtd.pnl)} P&L
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* YTD Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Year to Date</p>
                <p className="text-sm text-gray-500">{performanceData.ytd.label}</p>
                <p className={`text-2xl font-bold mt-2 ${
                  performanceData.ytd.pct >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(performanceData.ytd.pct)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatCurrency(performanceData.ytd.pnl)} P&L
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Since Inception */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Since Inception</p>
                <p className="text-sm text-gray-500">Since {formatDate(performanceData.sinceInception.since)}</p>
                <p className={`text-2xl font-bold mt-2 ${
                  performanceData.sinceInception.pct >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(performanceData.sinceInception.pct)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatCurrency(performanceData.sinceInception.pnl)} P&L
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Annualized Return */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Annualized Return</p>
                <p className="text-sm text-gray-500">vs Benchmark</p>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formatPercentage(performanceData.annualized.pct)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Benchmark: {formatPercentage(performanceData.annualized.benchmarkPct)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Metrics */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Risk Metrics</h3>
              <p className="text-sm text-gray-500">Key risk and volatility measures</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sharpe Ratio</span>
                  <span className="font-semibold">1.42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Max Drawdown</span>
                  <span className="font-semibold text-red-600">-5.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Volatility (Ann.)</span>
                  <span className="font-semibold">12.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Beta vs Benchmark</span>
                  <span className="font-semibold">0.85</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Returns */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Monthly Returns</h3>
              <p className="text-sm text-gray-500">Last 6 months performance</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { month: 'Jan 2025', return: 0.0347 },
                  { month: 'Dec 2024', return: 0.0156 },
                  { month: 'Nov 2024', return: -0.0089 },
                  { month: 'Oct 2024', return: 0.0234 },
                  { month: 'Sep 2024', return: 0.0178 },
                  { month: 'Aug 2024', return: 0.0067 },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.month}</span>
                    <span className={`font-semibold ${
                      item.return >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercentage(item.return)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quarterly Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quarterly Reports</h3>
            <p className="text-sm text-gray-500">Available performance reports for download</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { quarter: 'Q4 2024', status: 'Available', date: '2024-12-31' },
                { quarter: 'Q3 2024', status: 'Available', date: '2024-09-30' },
                { quarter: 'Q2 2024', status: 'Available', date: '2024-06-30' },
                { quarter: 'Q1 2024', status: 'Available', date: '2024-03-31' },
                { quarter: 'Q4 2023', status: 'Available', date: '2023-12-31' },
                { quarter: 'Q3 2023', status: 'Available', date: '2023-09-30' },
              ].map((report, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{report.quarter} Report</h4>
                      <p className="text-sm text-gray-500">Period ending {formatDate(report.date)}</p>
                    </div>
                    <button className="text-primary hover:text-primary-hover">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}