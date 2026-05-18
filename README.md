# Taskry

## Description

Taskry is a a simple task manager to organize your work. You can add tasks, assign them, and track their progress.

- [Desktop Demo](https://youtu.be/7w5Yf9h2zXg)
- [Mobile Demo](https://youtu.be/fSoxOnu92Bw)

## Tech Stack

- **TypeScript** — strongly typed programming language.
- **Next.js** — react framework for building full-stack web applications.
- **Storybook** — tool for developing and testing UI components in isolation.
- **React Aria** — library of unstyled React hooks and components that provides the accessibility, behavior, and keyboard interactions for building robust, accessible UI components.
- **Tailwind CSS** — utility-first CSS framework for fast and scalable UI development.
- **Prisma ORM** — type-safe ORM for working with the database and managing migrations.
- **Better Auth** — authentication and authorization framework for TypeScript.
- **PostgreSQL** — relational database used for storing application data.
- **Vitest** — unit and integration testing framework powered by Vite.
- **Cypress** — end-to-end testing framework for browser and UI testing.

## Getting Started

Copy the `.env.example` to `.env.development` (which will be ignored by Git):

Your `.env.development` file should look like this:

```
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=

S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_BUCKET=
S3_REGION=
S3_ENDPOINT=
```

Run the following commands to install packages, apply the migrations and seed the database.

```
npm install
npm run migrate:dev
npm run prisma:generate
npm run seed:dev
```

Run the development server:

```
npm run dev
```

Run storybook:

```
npm run storybook
```

Open http://localhost:3000 with your browser to see the result.
