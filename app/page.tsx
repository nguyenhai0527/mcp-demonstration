import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Next.js JWT Middleware Demo
                </h1>
                <p className="text-gray-600 mt-2">
                  Demonstrating JWT authentication with Next.js middleware
                </p>
              </div>
              {user && <LogoutButton />}
            </div>

            {user ? (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-green-800">
                        Welcome back, {user.email}!
                      </h3>
                      <p className="text-sm text-green-700 mt-1">
                        You are currently authenticated. You can access
                        protected routes.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Protected Pages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                      href="/dashboard"
                      className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <h3 className="text-lg font-medium text-blue-900">
                        Dashboard
                      </h3>
                      <p className="text-blue-700 text-sm mt-1">
                        View your dashboard
                      </p>
                    </a>
                    <a
                      href="/profile"
                      className="block p-6 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <h3 className="text-lg font-medium text-indigo-900">
                        Profile
                      </h3>
                      <p className="text-indigo-700 text-sm mt-1">
                        Manage your profile
                      </p>
                    </a>
                    <a
                      href="/settings"
                      className="block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <h3 className="text-lg font-medium text-purple-900">
                        Settings
                      </h3>
                      <p className="text-purple-700 text-sm mt-1">
                        Configure settings
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-yellow-800">
                        You are not authenticated
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please log in to access protected routes. If you try to
                        access a protected page, you'll be redirected to the
                        login page.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Try it out
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <a
                        href="/login"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Login
                      </a>
                      <p className="text-gray-600 text-sm mt-2">
                        Use: email@example.com / password123
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium mb-2">
                        Test protected routes (will redirect to login):
                      </p>
                      <div className="space-x-4">
                        <a
                          href="/dashboard"
                          className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                          Dashboard
                        </a>
                        <a
                          href="/profile"
                          className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                          Profile
                        </a>
                        <a
                          href="/settings"
                          className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                          Settings
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                How it works
              </h2>
              <div className="prose prose-sm text-gray-600">
                <ul className="space-y-2">
                  <li>
                    • <strong>Middleware:</strong> Runs on every request to
                    check authentication
                  </li>
                  <li>
                    • <strong>JWT Verification:</strong> Uses the `jose` library
                    to verify JWT tokens
                  </li>
                  <li>
                    • <strong>Cookie-based:</strong> Stores JWT tokens in secure
                    HTTP-only cookies
                  </li>
                  <li>
                    • <strong>Automatic Redirects:</strong> Redirects
                    unauthenticated users to login
                  </li>
                  <li>
                    • <strong>Protected Routes:</strong> /dashboard, /profile,
                    /settings require authentication
                  </li>
                  <li>
                    • <strong>Public Routes:</strong> /, /login, /register are
                    accessible to all
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
