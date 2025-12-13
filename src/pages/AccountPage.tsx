export default function AccountPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container-custom py-12">
                <h1 className="mb-8">My Account</h1>

                <div className="max-w-4xl mx-auto">
                    <div className="card p-8 text-center">
                        <svg className="w-16 h-16 mx-auto text-silver-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h2 className="mb-4">Account Access</h2>
                        <p className="text-silver-600 mb-8">
                            Sign in to view your orders, manage addresses, and track deliveries
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-primary">Sign In</button>
                            <button className="btn-secondary">Create Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
