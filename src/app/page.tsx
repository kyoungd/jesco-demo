'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignIn, useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function LoginPage() {
  const [selectedPortal, setSelectedPortal] = useState('jesco')
  const [showSignIn, setShowSignIn] = useState(false)
  const router = useRouter()
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      const accountId = user?.publicMetadata?.accountId || 'JESCO001'
      router.push(`/${selectedPortal}/portfolio?accountId=${accountId}`)
    }
  }, [isSignedIn, selectedPortal, router, user])

  const selectPortal = (portal: string) => {
    setSelectedPortal(portal)
  }

  const handleContinue = () => {
    setShowSignIn(true)
  }

  if (showSignIn) {
    return (
      <div className="bg-light min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold mb-2 text-primary">
              JESCO Analytics
            </h1>
            <p className="text-accent text-sm mb-4">
              Accessing {selectedPortal.toUpperCase()} Portal
            </p>
            <button 
              onClick={() => setShowSignIn(false)}
              className="text-sm text-primary hover:underline"
            >
              ← Back to portal selection
            </button>
          </div>
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'btn-primary',
                footerActionLink: 'text-primary hover:underline',
              }
            }}
            redirectUrl={`/${selectedPortal}/portfolio`}
          />
        </div>
      </div>
    )
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
        
        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          className="btn-primary w-full flex items-center justify-center mb-6"
        >
          Continue to {selectedPortal.toUpperCase()} Portal
        </button>

        {/* Security Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
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