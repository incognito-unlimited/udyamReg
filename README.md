# Udyam Registration Clone

This is a full-stack monorepo application recreating the first two stages of the Udyam registration form.

## Architecture

The project is structured as a monorepo using npm workspaces:

- `apps/web`: Frontend Next.js application (React, TypeScript)
- `apps/api`: Backend Express application (Node.js, TypeScript, Prisma ORM, PostgreSQL)
- `packages/shared`: Shared types, interfaces, and validation schemas
- `scraper`: Scripts to extract UI structure from the original form

## Technologies

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Testing**: Jest, Supertest
- **CI/CD**: GitHub Actions

## Local Setup

1. Clone the repository
2. Install dependencies from the root:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` in the root and respective apps:
   ```bash
   cp .env.example .env
   ```
4. Start the database (PostgreSQL) and update the `DATABASE_URL` in `.env`.
5. Run the Prisma migrations:
   ```bash
   npm run db:migrate --workspace=apps/api
   ```
6. Start the development servers:
   ```bash
   npm run dev
   ```

## Development Commands

- `npm run build`: Build all workspaces
- `npm run dev`: Start all workspaces in development mode
- `npm run lint`: Run ESLint across all workspaces
- `npm run typecheck`: Run TypeScript compilation check across all workspaces
- `npm run test`: Run Jest tests across all workspaces
