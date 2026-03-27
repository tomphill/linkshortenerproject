# Authentication Guidelines

## Core Rules

**All authentication in this project is handled exclusively by Clerk.**  
Do not implement, suggest, or use any other authentication methods (NextAuth, custom JWT, sessions, etc.).

## Protected Routes

### Dashboard Route
- The `/dashboard` page is a protected route
- Users MUST be logged in to access this page
- Use Clerk's authentication helpers to verify user status
- Redirect unauthenticated users to sign-in

### Homepage Behavior
- If a logged-in user accesses the homepage (`/`), redirect them to `/dashboard`
- Only show the landing page to unauthenticated visitors

## Sign In / Sign Up Flow

**Always use modal mode for authentication:**
- Sign in should launch as a modal overlay
- Sign up should launch as a modal overlay
- Use Clerk's built-in modal components (not redirect flows)

## Implementation Patterns

### Protecting Routes (Server Components)
```tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Protected content here
}
```

### Checking Auth Status (Client Components)
```tsx
'use client';

import { useUser } from '@clerk/nextjs';

export function MyComponent() {
  const { isSignedIn, user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  // Use isSignedIn to conditionally render
}
```

### Redirecting Logged-In Users
```tsx
// In homepage or public pages
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Show landing page for unauthenticated users
}
```

## Key Clerk Components

- `<ClerkProvider>` - Wraps the app in app/layout.tsx
- `<SignInButton>` - Triggers sign-in modal
- `<SignUpButton>` - Triggers sign-up modal
- `<UserButton>` - Shows user avatar with dropdown menu
- `auth()` - Server-side auth helper
- `useUser()` - Client-side auth hook

## Security Checklist

Before implementing any feature that accesses user data:
- ✅ Verify user is authenticated
- ✅ Check user owns the resource being accessed
- ✅ Use userId from Clerk, never trust client-provided IDs
- ✅ Implement authorization checks in Server Components or API routes

## References

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Protecting Routes](https://clerk.com/docs/guides/basic-rbac)
- [Authentication Helpers](https://clerk.com/docs/references/nextjs/auth)
