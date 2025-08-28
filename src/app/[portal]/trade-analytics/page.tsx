import DashboardLayout from '@/components/DashboardLayout'
import { getTradesData, getCommissionData, formatCurrency, formatDateTime } from '@/lib/data'
import { Portal } from '@/types'

interface TradeAnalyticsPageProps {
  params: { portal: Portal }
  searchParams: { accountId?: string }
}

export default async function TradeAnalyticsPage({ params, searchParams }: TradeAnalyticsPageProps) {
  const { portal } = await params
  const resolvedSearchParams = await searchParams
  const accountId = resolvedSearchParams.accountId || 'JESCO001'

  const [tradesData, commissionData] = await Promise.all([
    getTradesData(portal, accountId),
    getCommissionData(portal, accountId),
  ])

  const pageTitle = portal === 'saracoti' ? 'Trade Analytics & Commissions' : 'Trade Analytics'
  const pageDescription = portal === 'saracoti' 
    ? 'Trading activity with commission tracking and payouts'
    : 'Trading activity and performance metrics'

  if (!tradesData) {
    return (
      <DashboardLayout portal={portal} accountId={accountId}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Not Available</h2>
          <p className="text-gray-600">Trade data could not be loaded for this account.</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trade Volume */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Trade Volume</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(tradesData.summary.tradeVolume)}
                </p>
                <p className="text-sm text-gray-500 mt-1">{tradesData.filters.range}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Trade Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Trades</p>
                <p className="text-2xl font-bold text-gray-900">{tradesData.summary.tradeCount}</p>
                <p className="text-sm text-gray-500 mt-1">Executed transactions</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Average Per Trade */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Avg Per Trade</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(tradesData.summary.avgPerTrade)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Average notional</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Cards (Saracoti only) */}
        {portal === 'saracoti' && commissionData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commissionData.snapshots.map((snapshot, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Commission Summary - {snapshot.period}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Earned</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(snapshot.earned)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Paid Out</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(snapshot.paid)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-sm font-medium text-gray-900">Retained</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(snapshot.retained)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trades Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Trade History</h3>
            <p className="text-sm text-gray-500">Recent trading activity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date/Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instrument
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Side
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notional
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                  {portal === 'saracoti' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tradesData.rows.map((trade, index) => {
                  const commissionEntry = commissionData?.byTrade.find(c => c.tradeId === `T-${index + 1}`)
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(trade.executedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {trade.instrument}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          trade.side === 'BUY' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.side}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trade.quantity.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${trade.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(trade.notional)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trade.venue}
                      </td>
                      {portal === 'saracoti' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {commissionEntry ? formatCurrency(commissionEntry.calcGross) : '-'}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}