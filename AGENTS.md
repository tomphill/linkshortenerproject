# Link Shortener Project - AI Agent Instructions

This document provides guidance for AI coding assistants working on this project.

## Project Overview

A modern link shortener application built with:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **UI**: shadcn/ui + Tailwind CSS v4
- **Icons**: Lucide React

## Detailed Coding Standards

Comprehensive coding standards are organized into separate instruction files in the `/docs` directory. These files contain best practices, patterns, and examples specific to each technology area.

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory.
ALWAYS refer to the relevant .md file BEFORE generating any code:

- [Authentication Guidelines](/docs/authentication.md) - Clerk integration, protected routes, sign-in/sign-up flows
- [UI Components Guidelines](/docs/ui-components.md) - shadcn/ui usage, component patterns, styling

## Quick Start Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Database
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations

# Build & Deploy
npm run build        # Production build
npm run start        # Start production server
```

## Project Structure

```
app/                 # Next.js App Router pages
  layout.tsx         # Root layout with Clerk provider
  page.tsx          # Landing page (public)
  dashboard/        # Protected dashboard area
components/
  ui/               # shadcn/ui components (don't modify)
db/
  schema.ts         # Drizzle database schema
  index.ts          # Database connection
docs/               # AI agent instruction files
lib/
  utils.ts          # Utility functions (cn, etc.)
```

## Key Principles

1. **Server-first**: Prefer Server Components; use Client Components only when necessary
2. **Type Safety**: Strict TypeScript with explicit types for clarity
3. **Security**: Always verify authentication before data access
4. **Consistency**: Follow established patterns in existing code
5. **Accessibility**: Use semantic HTML and ARIA attributes

## Development Workflow

1. Read relevant instruction files from `/docs` for the feature you're building
2. Follow established patterns from existing code
3. Use TypeScript strictly - resolve all type errors
4. Test authentication flows for both signed-in and signed-out states
5. Ensure responsive design works on mobile and desktop
6. Run the dev server to verify changes

## Getting Help

- Review existing code in similar components for patterns
- Check instruction files in `/docs` for detailed guidance
- Consult official documentation:
  - [Next.js Docs](https://nextjs.org/docs)
  - [Drizzle ORM Docs](https://orm.drizzle.team)
  - [Clerk Docs](https://clerk.com/docs)
  - [shadcn/ui Docs](https://ui.shadcn.com)

---

*Note: This is a tutorial project from a GitHub Copilot course. Instruction files are designed to help AI assistants maintain consistent coding standards throughout development.*
