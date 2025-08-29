import DashboardLayout from '@/components/DashboardLayout'
import { getPortfolioData, getActivityData, getPerformanceData, formatCurrency, formatPercentage, formatDate } from '@/lib/data'
import { Portal } from '@/types'

interface PortfolioPageProps {
  params: Promise<{ portal: Portal }>
  searchParams: Promise<{ accountId?: string }>
}

export default async function PortfolioPage({ params, searchParams }: PortfolioPageProps) {
  const { portal } = await params
  const resolvedSearchParams = await searchParams
  const accountId = resolvedSearchParams.accountId || 'JESCO001'

  const [portfolioData, activityData, performanceData] = await Promise.all([
    getPortfolioData(portal, accountId),
    getActivityData(portal, accountId),
    getPerformanceData(portal, accountId),
  ])

  if (!portfolioData) {
    return (
      <DashboardLayout portal={portal} accountId={accountId}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Not Available</h2>
          <p className="text-gray-600">Portfolio data could not be loaded for this account.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout portal={portal} accountId={accountId}>
      <div className="space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Portfolio Value */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolioData.totals.portfolioValue)}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    portfolioData.performanceToday.pct >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(portfolioData.performanceToday.pct)}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({formatCurrency(portfolioData.performanceToday.abs)})
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Cash */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Available Cash</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolioData.totals.cash)}
                </p>
                <p className="text-sm text-gray-500 mt-2">Ready for deployment</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Fixed Income */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Fixed Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolioData.totals.fixedIncome)}
                </p>
                <p className="text-sm text-gray-500 mt-2">Bonds & securities</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Carbon Credits */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Carbon Credits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolioData.totals.carbonCredits)}
                </p>
                <p className="text-sm text-gray-500 mt-2">Environmental assets</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-sm text-gray-500">Cash movements and profit taking</p>
              </div>
              <div className="p-6">
                {activityData?.movements.map((movement, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 mb-4 border-b border-gray-100 last:border-b-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      movement.type === 'profit' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {movement.type === 'profit' ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{movement.title}</p>
                      <p className="text-sm text-gray-600">{movement.note}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(movement.when)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        movement.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(Math.abs(movement.amount))}
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                <p className="text-sm text-gray-500">Period returns</p>
              </div>
              <div className="p-6 space-y-4">
                {performanceData && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">MTD</span>
                      <div className="text-right">
                        <span className={`font-semibold ${
                          performanceData.mtd.pct >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatPercentage(performanceData.mtd.pct)}
                        </span>
                        <p className="text-xs text-gray-500">{formatCurrency(performanceData.mtd.pnl)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">YTD</span>
                      <div className="text-right">
                        <span className={`font-semibold ${
                          performanceData.ytd.pct >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatPercentage(performanceData.ytd.pct)}
                        </span>
                        <p className="text-xs text-gray-500">{formatCurrency(performanceData.ytd.pnl)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Since Inception</span>
                      <div className="text-right">
                        <span className={`font-semibold ${
                          performanceData.sinceInception.pct >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatPercentage(performanceData.sinceInception.pct)}
                        </span>
                        <p className="text-xs text-gray-500">{formatCurrency(performanceData.sinceInception.pnl)}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Annualized Return</span>
                        <span className="font-semibold text-primary">
                          {formatPercentage(performanceData.annualized.pct)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">vs Benchmark</span>
                        <span className="text-xs text-gray-500">
                          {formatPercentage(performanceData.annualized.benchmarkPct)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Last updated: {formatDate(portfolioData.asOf)}
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}