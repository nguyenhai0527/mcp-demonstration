# Next.js JWT Middleware Authentication Demo

This project demonstrates how to implement JWT authentication in Next.js using middleware to protect routes and manage user sessions with cookies.

## Features

- ✅ **JWT Authentication** - Secure token-based authentication using the `jose` library
- ✅ **Middleware Protection** - Automatic route protection and redirects
- ✅ **Cookie-based Sessions** - Secure HTTP-only cookies for token storage
- ✅ **Automatic Redirects** - Seamless user experience with redirect flows
- ✅ **Protected Routes** - Multiple levels of route protection
- ✅ **TypeScript Support** - Full type safety throughout the application

## How It Works

### 1. Middleware (`middleware.ts`)

The middleware runs on every request and:

- Checks for a valid JWT token in cookies
- Verifies the token signature and claims using the `jose` library
- Redirects unauthenticated users to `/login` for protected routes
- Redirects authenticated users away from auth-only routes (login/register)
- Adds user information to request headers for server components

### 2. Authentication Library (`lib/auth.ts`)

Provides utility functions for:

- Creating and signing JWT tokens
- Verifying token authenticity
- Managing authentication cookies
- Getting current user information
- Checking authentication status

### 3. Route Protection

- **Protected Routes**: `/dashboard`, `/profile`, `/settings` - require authentication
- **Public Routes**: `/`, `/login`, `/register` - accessible to all users
- **Auth-only Routes**: `/login`, `/register` - redirect authenticated users away

## Getting Started

### 1. Install Dependencies

```bash
npm install jose
```

### 2. Environment Variables

Create a `.env.local` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-must-be-at-least-32-characters-long
JWT_ISSUER=your-app-name
JWT_AUDIENCE=your-app-users
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Test Authentication

1. Visit `http://localhost:3000`
2. Try accessing protected routes (will redirect to login)
3. Login with demo credentials:
   - Email: `email@example.com`
   - Password: `password123`
4. Access protected routes after authentication

## Code Structure

```
├── middleware.ts                 # JWT middleware for route protection
├── lib/
│   └── auth.ts                  # Authentication utilities
├── app/
│   ├── page.tsx                 # Home page with auth status
│   ├── login/
│   │   └── page.tsx             # Login form
│   ├── dashboard/
│   │   └── page.tsx             # Protected dashboard
│   ├── profile/
│   │   └── page.tsx             # Protected profile page
│   ├── settings/
│   │   └── page.tsx             # Protected settings page
│   └── api/
│       └── auth/
│           ├── login/
│           │   └── route.ts     # Login API endpoint
│           └── logout/
│               └── route.ts     # Logout API endpoint
├── components/
│   └── LogoutButton.tsx         # Logout functionality
└── .env.local                   # Environment variables
```

## Key Features Explained

### JWT Token Structure

The JWT tokens include:

- `sub` (subject): User ID
- `email`: User email address
- `role`: User role (user, admin, etc.)
- `iat` (issued at): Token creation timestamp
- `exp` (expires): Token expiration timestamp
- `iss` (issuer): Token issuer
- `aud` (audience): Token audience

### Security Features

- **HTTP-only Cookies**: Prevents XSS attacks by making tokens inaccessible to JavaScript
- **Secure Cookies**: HTTPS-only in production
- **SameSite Protection**: CSRF protection
- **Token Verification**: Cryptographic signature verification
- **Expiration Handling**: Automatic token expiration and cleanup

### Middleware Configuration

The middleware runs on all routes except:

- API routes (`/api/*`)
- Static files (`/_next/static/*`, `/_next/image/*`)
- Public assets (`.png`, `.jpg`, `.css`, `.js`, etc.)
- Favicon and other static resources

## Authentication Flow

### Login Flow

1. User submits credentials to `/api/auth/login`
2. Server validates credentials (demo implementation)
3. JWT token is created and signed
4. Token is set as HTTP-only cookie
5. User is redirected to dashboard or original destination

### Protection Flow

1. User requests a protected route
2. Middleware intercepts the request
3. JWT token is extracted from cookies
4. Token is verified using `jose.jwtVerify()`
5. If valid: request continues
6. If invalid: user is redirected to login

### Logout Flow

1. User clicks logout button
2. Request sent to `/api/auth/logout`
3. Authentication cookie is cleared
4. User is redirected to home page

## Customization

### Adding New Protected Routes

1. Add the route to `protectedRoutes` array in `middleware.ts`:

```typescript
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/admin",
  "/settings",
  "/your-new-route",
];
```

2. Create the page component and use `getCurrentUser()` or `requireAuth()`:

```typescript
import { getCurrentUser } from "@/lib/auth";

export default async function YourNewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  // Your protected content
}
```

### Customizing JWT Claims

Modify the `JWTPayload` interface in `lib/auth.ts`:

```typescript
export interface JWTPayload {
  sub: string;
  email?: string;
  role?: string;
  permissions?: string[];
  // Add your custom claims
}
```

### Changing Authentication Logic

Replace the demo authentication in `/api/auth/login/route.ts` with your actual authentication system (database, external service, etc.).

## Production Considerations

1. **Environment Variables**: Use strong, random JWT secrets
2. **HTTPS**: Always use HTTPS in production
3. **Database Integration**: Replace demo authentication with real user data
4. **Rate Limiting**: Add rate limiting to login endpoints
5. **Refresh Tokens**: Consider implementing refresh token rotation
6. **Logging**: Add proper authentication logging and monitoring
7. **CSP Headers**: Configure Content Security Policy headers

## Dependencies

- **`jose`**: Modern JWT library for JavaScript/TypeScript
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

## License

This is a demonstration project. Feel free to use and modify as needed.
