import DashboardLayout from '@/components/DashboardLayout'
import { getFixedIncomeData, formatCurrency, formatPercentage, formatDate } from '@/lib/data'
import { Portal } from '@/types'

interface FixedIncomePageProps {
  params: Promise<{ portal: Portal }>
  searchParams: Promise<{ accountId?: string }>
}

function getRatingColor(rating: string): string {
  switch (rating) {
    case 'AAA':
    case 'AA+':
    case 'AA':
    case 'AA-':
      return 'bg-green-100 text-green-800'
    case 'A+':
    case 'A':
    case 'A-':
      return 'bg-blue-100 text-blue-800'
    case 'BBB+':
    case 'BBB':
    case 'BBB-':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getMaturityColor(bucket: string): string {
  switch (bucket) {
    case 'short':
      return 'bg-green-100 text-green-800'
    case 'medium':
      return 'bg-blue-100 text-blue-800'
    case 'long':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default async function FixedIncomePage({ params, searchParams }: FixedIncomePageProps) {
  const { portal } = await params
  const resolvedSearchParams = await searchParams
  const accountId = resolvedSearchParams.accountId || 'JESCO001'

  const fixedIncomeData = await getFixedIncomeData(portal, accountId)

  if (!fixedIncomeData) {
    return (
      <DashboardLayout portal={portal} accountId={accountId}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Not Available</h2>
          <p className="text-gray-600">Fixed income data could not be loaded for this account.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout portal={portal} accountId={accountId}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fixed Income Portfolio</h1>
          <p className="text-gray-600">Bonds, treasuries and fixed income securities</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Value */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(fixedIncomeData.summary.total)}
                </p>
                <p className={`text-sm font-medium mt-2 ${
                  fixedIncomeData.summary.pnlToday >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  Today: {formatCurrency(fixedIncomeData.summary.pnlToday)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Yield */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Portfolio Yield</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercentage(fixedIncomeData.summary.yieldPct)}
                </p>
                <p className="text-sm text-gray-500 mt-2">Weighted average</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Modified Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {fixedIncomeData.summary.modifiedDuration}
                </p>
                <p className="text-sm text-gray-500 mt-2">Interest rate sensitivity</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {fixedIncomeData.summary.avgRating}
                </p>
                <p className="text-sm text-gray-500 mt-2">Credit quality</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bonds Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Bond Holdings</h3>
            <p className="text-sm text-gray-500">Individual bond positions and details</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maturity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maturity Bucket
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fixedIncomeData.bonds.map((bond, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bond.issuer}</div>
                        <div className="text-sm text-gray-500">{bond.isin}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPercentage(bond.couponPct)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(bond.maturity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(bond.rating)}`}>
                        {bond.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bond.quantity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bond.cleanPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(bond.marketValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMaturityColor(bond.maturityBucket)}`}>
                        {bond.maturityBucket}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Portfolio Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rating Distribution */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
              <p className="text-sm text-gray-500">Portfolio composition by credit rating</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { rating: 'AA', percentage: 0.45, value: fixedIncomeData.summary.total * 0.45 },
                  { rating: 'A+', percentage: 0.30, value: fixedIncomeData.summary.total * 0.30 },
                  { rating: 'A', percentage: 0.25, value: fixedIncomeData.summary.total * 0.25 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(item.rating)}`}>
                        {item.rating}
                      </span>
                      <span className="text-sm text-gray-600">{formatPercentage(item.percentage)}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Maturity Profile */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Maturity Profile</h3>
              <p className="text-sm text-gray-500">Portfolio composition by maturity</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { bucket: 'Short (< 3 years)', percentage: 0.25, label: 'short' },
                  { bucket: 'Medium (3-7 years)', percentage: 0.45, label: 'medium' },
                  { bucket: 'Long (> 7 years)', percentage: 0.30, label: 'long' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMaturityColor(item.label)}`}>
                        {item.bucket.split(' ')[0]}
                      </span>
                      <span className="text-sm text-gray-600">{item.bucket}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatPercentage(item.percentage)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Last updated: {formatDate(fixedIncomeData.asOf)}
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}