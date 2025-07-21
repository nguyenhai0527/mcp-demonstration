import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  // Get the current user - this will be null if not authenticated
  const user = await getCurrentUser();

  // If not authenticated, redirect to login
  // Note: The middleware should handle this, but this is a backup
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <LogoutButton />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Welcome Back!
                </h2>
                <div className="space-y-2">
                  <p className="text-blue-800">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-blue-800">
                    <span className="font-medium">User ID:</span> {user.sub}
                  </p>
                  <p className="text-blue-800">
                    <span className="font-medium">Role:</span>{" "}
                    {user.role || "user"}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Authentication Status
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-800">Authenticated</span>
                  </div>
                  <p className="text-green-800 text-sm">
                    JWT token is valid and verified
                  </p>
                  <p className="text-green-800 text-sm">
                    Session expires:{" "}
                    {user.exp
                      ? new Date(user.exp * 1000).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Protected Content
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This page is protected by the Next.js middleware. Only
                      authenticated users with valid JWT tokens can access this
                      content. The middleware automatically redirects
                      unauthenticated users to the login page.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Navigation
              </h2>
              <div className="space-y-2">
                <a
                  href="/profile"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mr-4"
                >
                  Profile (Protected)
                </a>
                <a
                  href="/settings"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mr-4"
                >
                  Settings (Protected)
                </a>
                <a
                  href="/"
                  className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Home (Public)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
