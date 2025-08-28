'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Portal } from '@/types'

interface DashboardLayoutProps {
  children: React.ReactNode
  portal: Portal
  accountId: string
}

export default function DashboardLayout({ children, portal, accountId }: DashboardLayoutProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentPage = pathname.split('/').pop() || 'portfolio'
  const portalName = portal === 'jesco' ? 'JESCO' : 'Saracoti'
  const portalLabel = portal === 'jesco' ? 'Banking Portal' : 'Commission Portal'

  const navItems = [
    { key: 'portfolio', label: 'Portfolio', href: `/${portal}/portfolio` },
    { key: 'trade-analytics', label: 'Trade Analytics', href: `/${portal}/trade-analytics` },
    { key: 'performance', label: 'Performance', href: `/${portal}/performance` },
    { key: 'fixed-income', label: 'Fixed Income', href: `/${portal}/fixed-income` },
  ]

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Portal Name */}
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-primary">{portalName} Analytics</h1>
                <p className="text-xs text-gray-500">{portalLabel}</p>
              </div>
            </div>

            {/* Account Selector and User Badge */}
            <div className="flex items-center space-x-4">
              {/* Account Selector */}
              <div className="flex items-center space-x-2">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={accountId}
                  onChange={() => {}} // For demo purposes
                >
                  <option value="JESCO001">JESCO001 - Master Account</option>
                  <option value="JESCO001-A">JESCO001-A - Sub Account</option>
                </select>
              </div>

              {/* User Badge */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-gray-500 text-xs">Last login: Today, 9:15 AM</p>
                </div>
              </div>

              {/* Logout Button */}
              <Link href="/" className="text-sm text-primary hover:text-primary-hover">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.key
              const href = `${item.href}?accountId=${accountId}`
              
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}