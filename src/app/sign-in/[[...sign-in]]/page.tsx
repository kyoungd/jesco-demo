import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="bg-light min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold mb-2 text-primary">
            JESCO Analytics
          </h1>
          <p className="text-accent text-sm">
            Sign in to your account
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'btn-primary',
              footerActionLink: 'text-primary hover:underline',
            }
          }}
        />
      </div>
    </div>
  )
}