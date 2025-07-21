import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <LogoutButton />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  User Information
                </h2>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      User ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.sub}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.role || "user"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Token Issued
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.iat
                        ? new Date(user.iat * 1000).toLocaleString()
                        : "N/A"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Protected Page
                </h2>
                <p className="text-gray-600">
                  This profile page is protected by Next.js middleware. Only
                  authenticated users can access this page. If you weren't
                  logged in, you would have been redirected to the login page.
                </p>
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
                    href="/settings"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Settings
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
