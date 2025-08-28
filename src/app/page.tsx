export default function Home() {
  return (
    <main className="min-h-screen bg-bg-light">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            JESCO Analytics
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Phase 1 Implementation - Reports and analytics on banking accounts
          </p>
          <div className="space-x-4">
            <button className="btn-primary">
              Get Started
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}