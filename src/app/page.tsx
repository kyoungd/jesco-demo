'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [selectedPortal, setSelectedPortal] = useState('jesco')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const selectPortal = (portal: string) => {
    setSelectedPortal(portal)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const accountId = formData.get('accountId') as string

    if (!selectedPortal) {
      setError('Please select a portal (JESCO or Saracoti) before logging in.')
      setLoading(false)
      return
    }

    // Simulate authentication
    setTimeout(() => {
      router.push(`/${selectedPortal}/portfolio?accountId=${accountId}`)
    }, 2000)
  }

  return (
    <div className="bg-light min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold mb-2 text-primary">
            JESCO Analytics
          </h1>
          <p className="text-accent text-sm">
            Banking & Investment Portfolio Management
          </p>
        </div>

        {/* Portal Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Portal
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* JESCO Portal */}
            <div 
              className={`portal-selector rounded-lg p-4 cursor-pointer text-center border-2 transition-all duration-300 ${
                selectedPortal === 'jesco' 
                  ? 'border-primary bg-bg-light shadow-sm' 
                  : 'border-gray-200 hover:border-primary hover:bg-bg-light'
              }`}
              onClick={() => selectPortal('jesco')}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-sm">JESCO</h3>
              <p className="text-xs text-gray-500">Banking Portal</p>
            </div>

            {/* Saracoti Portal */}
            <div 
              className={`portal-selector rounded-lg p-4 cursor-pointer text-center border-2 transition-all duration-300 ${
                selectedPortal === 'saracoti' 
                  ? 'border-primary bg-bg-light shadow-sm' 
                  : 'border-gray-200 hover:border-primary hover:bg-bg-light'
              }`}
              onClick={() => selectPortal('saracoti')}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-sm">Saracoti</h3>
              <p className="text-xs text-gray-500">Commission Portal</p>
            </div>
          </div>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account ID Field */}
          <div>
            <label htmlFor="accountId" className="block text-sm font-medium text-gray-700 mb-2">
              Account ID
            </label>
            <input 
              type="text" 
              id="accountId" 
              name="accountId" 
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="Enter your account identifier"
              defaultValue="JESCO001"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Master or Sub-Account identifier</p>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Secure Access Code
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                id="password" 
                name="password" 
                className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Enter your secure access code"
                required
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Remember Me & Recovery */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember" 
                name="remember" 
                type="checkbox" 
                className="h-4 w-4 rounded border-gray-300 accent-primary"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember this device
              </label>
            </div>
            
            <a href="#" className="text-sm text-primary hover:underline">
              Account recovery?
            </a>
          </div>
          
          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              selectedPortal === 'jesco' ? 'Access JESCO Portfolio' : 'Access Saracoti Portal'
            )}
          </button>
        </form>
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-800">Secure Banking Portal</h4>
              <p className="text-xs text-blue-700 mt-1">
                All data is encrypted in transit and at rest. You can only access your entitled Master/Sub-Account data.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 JESCO Analytics. SOC 2 Type II Compliant Banking Platform.
          </p>
        </div>
      </div>
    </div>
  )
}