import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <LogoutButton />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Account Settings
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    This is a protected settings page. The middleware ensures
                    only authenticated users can access this content.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  JWT Token Information
                </h2>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <p className="text-blue-800 text-sm">
                    <span className="font-medium">Subject (User ID):</span>{" "}
                    {user.sub}
                  </p>
                  <p className="text-blue-800 text-sm">
                    <span className="font-medium">Issuer:</span>{" "}
                    {user.iss || "N/A"}
                  </p>
                  <p className="text-blue-800 text-sm">
                    <span className="font-medium">Audience:</span>{" "}
                    {user.aud || "N/A"}
                  </p>
                  <p className="text-blue-800 text-sm">
                    <span className="font-medium">Issued At:</span>{" "}
                    {user.iat
                      ? new Date(user.iat * 1000).toLocaleString()
                      : "N/A"}
                  </p>
                  <p className="text-blue-800 text-sm">
                    <span className="font-medium">Expires At:</span>{" "}
                    {user.exp
                      ? new Date(user.exp * 1000).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Middleware Protection
                </h2>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-800 font-medium">
                      Protected Route
                    </span>
                  </div>
                  <p className="text-green-700 text-sm">
                    This page is automatically protected by the Next.js
                    middleware. The middleware:
                  </p>
                  <ul className="list-disc list-inside text-green-700 text-sm mt-2 space-y-1">
                    <li>Checks for a valid JWT in cookies</li>
                    <li>Verifies the token signature and claims</li>
                    <li>Redirects unauthenticated users to /login</li>
                    <li>Adds user information to request headers</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Navigation
                </h2>
                <div className="space-x-4">
                  <a
                    href="/dashboard"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/profile"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Profile
                  </a>
                  <a
                    href="/"
                    className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
