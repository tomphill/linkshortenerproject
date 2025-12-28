# Agent Instructions for Link Shortener Project

This document provides comprehensive guidelines for AI agents and LLMs working on this project. These instructions ensure consistency, quality, and adherence to project standards.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Coding Standards](#coding-standards)
4. [Documentation](#documentation)

## Project Overview

This is a link shortener application built with modern web technologies. The application allows users to:

- Create shortened URLs
- Track link analytics
- Manage their links with authentication
- Share links publicly or privately

**Project Type:** Full-stack Next.js application  
**Database:** PostgreSQL (via Neon Database)  
**ORM:** Drizzle ORM  
**Authentication:** Clerk  
**Styling:** Tailwind CSS v4

## Technology Stack

### Core Technologies

- **Framework:** Next.js 16.0.10 (App Router)
- **Runtime:** React 19.2.1
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL via @neondatabase/serverless
- **ORM:** Drizzle ORM 0.45.1
- **Authentication:** Clerk (@clerk/nextjs 6.36.2)
- **Styling:** Tailwind CSS 4.x

### Development Tools

- **Package Manager:** npm (implied from workspace)
- **Linter:** ESLint 9.x
- **Database Migrations:** Drizzle Kit 0.31.8
- **TypeScript Executor:** tsx 4.21.0

### UI Libraries

- **Icons:** Lucide React 0.561.0
- **Utilities:** clsx, tailwind-merge, class-variance-authority
- **Animations:** tw-animate-css

## Coding Standards

### General Principles

1. **Type Safety First**

   - Always use TypeScript with strict mode enabled
   - Avoid `any` types; use `unknown` or proper type definitions
   - Export and reuse type definitions across files

2. **Component Organization**

   - Use functional components with TypeScript
   - Place reusable components in appropriate directories
   - Keep components focused and single-responsibility

3. **File Naming**

   - Use kebab-case for directories: `link-manager/`
   - Use PascalCase for React components: `LinkCard.tsx`
   - Use camelCase for utilities and hooks: `useLinks.ts`
   - Use kebab-case for regular TypeScript files: `api-client.ts`

4. **Import Organization**

   - Group imports: external packages → internal modules → types → styles
   - Use path aliases (`@/`) defined in tsconfig.json
   - Avoid circular dependencies

5. **Code Style**
   - Use 2-space indentation
   - Use double quotes for strings (match ESLint config)
   - Use semicolons (TypeScript standard)
   - Prefer const over let; avoid var
   - Use arrow functions for callbacks and functional components

### Next.js Specific

1. **App Router Convention**

   - Use Server Components by default
   - Add `"use client"` directive only when needed
   - Follow Next.js 16.x file conventions (page.tsx, layout.tsx, etc.)

2. **Metadata**

   - Export metadata objects for SEO
   - Use generateMetadata for dynamic pages

3. **Performance**

   - Use dynamic imports for large components
   - Implement proper loading states
   - Optimize images with next/image

4. **⚠️ CRITICAL: Routing & Middleware**
   - **NEVER use middleware.ts** - This is deprecated in Next.js 16.x
   - **ALWAYS use proxy.ts** for request handling and routing logic
   - The project uses proxy.ts as the modern replacement for middleware functionality

### Database & ORM

1. **Drizzle ORM Patterns**

   - Define schemas in `db/schema.ts`
   - Use Drizzle's type-safe query builder
   - Export types from schema definitions
   - Use transactions for multi-step operations

2. **Migrations**
   - Generate migrations with `drizzle-kit`
   - Review generated SQL before applying
   - Never edit schema files directly in production

### Authentication

1. **Clerk Integration**

   - Wrap app with ClerkProvider in root layout
   - Use Clerk hooks for auth state
   - Protect routes with Clerk middleware
   - Use userId from auth() for database associations

2. **Authorization**
   - Always verify user ownership on server actions
   - Implement proper access control for data operations
   - Never trust client-side authorization

## Documentation

### Code Comments

1. **When to Comment**

   - Complex business logic
   - Non-obvious algorithmic decisions
   - Workarounds for known issues
   - Public API functions

2. **JSDoc for Functions**

   ```typescript
   /**
    * Shortens a URL and stores it in the database
    * @param url - The original URL to shorten
    * @param userId - The authenticated user's ID
    * @returns The shortened URL object
    */
   ```

3. **Avoid Obvious Comments**
   - Don't comment what the code clearly shows
   - Focus on "why" not "what"

### Component Documentation

1. **Props Interface**

   - Document complex props with JSDoc
   - Provide examples for non-trivial usage
   - Export prop types for reuse

2. **Component Purpose**
   - Add brief description for complex components
   - Document any non-standard behavior
   - Note dependencies or requirements

## Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx drizzle-kit push # Push schema changes to database
```

### Path Alias

- Use `@/` to reference project root: `import { db } from "@/db"`

### Environment Variables

Required variables (add to `.env.local`):

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

---

**Note:** This is a living document. Update these guidelines as the project evolves. When in doubt, prioritize consistency with existing code patterns in the project.
