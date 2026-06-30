# Taskry

Taskry is a simple task management system. It helps you manage projects, tasks, clients, and team members with ease. You can create and organize projects with tasks, and break work into subtasks. The system also includes search, filtering, and sorting to quickly find what you need.

## Links

Taskry and its storybook are available at the links below.

- [Taskry](https://taskry.ru)
- [Storybook](https://storybook.taskry.ru)

## Demo videos

In the following videos, a demonstration of the application is shown in both desktop and mobile versions with light and dark themes.

- [Desktop (Light Theme)](https://youtu.be/8nDvyUagTw0)
- [Desktop (Dark Theme)](https://youtu.be/F5QXiqQ25Ek)
- [Mobile (Light Theme)](https://youtu.be/aSs-WBqivkI)

## Features

- **Projects** — Manage projects and categories. Create, edit, delete projects. Each project can include tasks.
- **Tasks** — Manage tasks and categories. Create, edit, delete tasks. Subtasks support breaking work into smaller parts.
- **Clients** — Manage clients and companies. Create, edit, delete client.
- **Team** — Manage users, positions and roles. Create, edit, delete users. Roles and permissions.
- **Filtering and sorting** — Filter and sort data to quickly find and manage projects, tasks, users, and clients.
- **Search** — Quickly find projects, tasks, users, and clients using search.
- **Comments** — Add comments to projects and tasks for discussion and collaboration.

## Tech Stack

| Category                 | Technologies                                                   |
| ------------------------ | -------------------------------------------------------------- |
| **Core**                 | TypeScript, Next.js, React                                     |
| **UI & Styling**         | Tailwind CSS, React Aria, Storybook, lucide-react, next-themes |
| **Database**             | Prisma ORM, PostgreSQL                                         |
| **Data Fetching**        | SWR                                                            |
| **Authentication**       | Better Auth                                                    |
| **Validation**           | Zod                                                            |
| **Internationalization** | next-intl                                                      |
| **Testing & Quality**    | Vitest, React Testing Library, ESLint                          |
| **Services**             | AWS SDK                                                        |
| **Communication**        | Nodemailer                                                     |
| **Containerization**     | Docker                                                         |

## Getting Started

### Development

Copy the `.env.development.example` to `.env.development` (which will be ignored by Git) and configure the required environment variables.

Run the following commands to install packages, apply the migrations and seed the database.

```
npm install
npm run migrate:dev
npm run prisma-generate:dev
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

### Production

Copy the `.env.production.example` to `.env.production` (which will be ignored by Git) and configure the required environment variables.

To deploy the app in production, you need to build the database and application images, start the required containers, and initialize the database with migrations and seed data.

```bash
# Start PostgreSQL database container
docker compose -f docker-compose.production.yml up --build -d postgres_db

# Run database initialization (migrations + seed data)
docker compose -f docker-compose.production.yml up --build -d db_init

# Start application container
docker compose -f docker-compose.production.yml up --build -d app
```

## Storybook

### Development

This command starts the local development server and automatically open the address in a new browser window.

```
npm run storybook
```

### Production

This command builds the Storybook image and starts it in a docker container

```bash
docker compose -f docker-compose.production.yml up --build -d storybook
```

## Testing

The project includes several types of tests: UI tests, end-to-end tests, and integration tests.

### UI tests

Runs fast component-level and UI tests.

```
npm run test:ui
```

### End-to-end tests

Copy the `.env.e2e.example` to `.env.e2e` (which will be ignored by Git) and configure the required environment variables.

Starts required docker services, prepares the database, runs the dev server, and opens Cypress UI.

```
npm run test:e2e
```

Runs the same E2E tests in CI mode without UI.

```
npm run test:e2e:headless
```

### Integration tests

Copy the `.env.integration.example` to `.env.integration` (which will be ignored by Git) and configure the required environment variables.

Runs integration tests using a separate environment and database setup.

```
npm run test:integration
```

## Environment Variables

Your `.env.development`, `.env.production`, `.env.e2e`, or `.env.integration` file should look like this:

| Variable             | Description                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `POSTGRES_USER`      | PostgreSQL username used by the docker container. See https://hub.docker.com/_/postgres#postgres_user       |
| `POSTGRES_PASSWORD`  | PostgreSQL password used by the docker container. See https://hub.docker.com/_/postgres#postgres_password   |
| `POSTGRES_DB`        | PostgreSQL database name created by the docker container. See https://hub.docker.com/_/postgres#postgres_db |
| `DATABASE_URL`       | PostgreSQL connection string used by prisma ORM.                                                            |
| `BETTER_AUTH_SECRET` | Secret key value by better-auth. See https://better-auth.com/docs/installation#set-environment-variables    |
| `BETTER_AUTH_URL`    | Base application URL used by better-auth.                                                                   |
| `SMTP_HOST`          | SMTP server hostname or IP address. See https://nodemailer.com/smtp#general-options                         |
| `SMTP_PORT`          | SMTP server port number. See https://nodemailer.com/smtp#general-options                                    |
| `SMTP_SECURE`        | Use TLS on connect (true for 465, otherwise STARTTLS). See https://nodemailer.com/smtp#general-options      |
| `SMTP_USER`          | SMTP auth username. See https://nodemailer.com/smtp#login                                                   |
| `SMTP_PASS`          | SMTP auth password. See https://nodemailer.com/smtp#login                                                   |
| `S3_ACCESS_KEY`      | AWS access key ID.                                                                                          |
| `S3_SECRET_KEY`      | AWS secret access key.                                                                                      |
| `S3_BUCKET`          | AWS S3 bucket name.                                                                                         |
| `S3_REGION`          | AWS S3 region.                                                                                              |
| `S3_ENDPOINT`        | Full URL of a custom S3-compatible endpoint                                                                 |

## Project Structure

```
├── app/                                 # Locale-based routing
│   ├── [locale]/
│   │   ├── (auth)/                      # Authentication routes
│   │   ├── (dashboard)/                 # Dashboard routes
│   │   ├── (site)/                      # Landing page and documentation routes
│   │   └── layout.tsx
│   ├── api/                             # Route Handlers
│   └── globals.css
├── auth/                                # Auth components
├── common/                              # Shared components
├── cypress/                             # e2e tests
├── dashboard/                           # Dashboard components
├── i18n/                                # next-intl configuration files
├── icons/                               # Icon components
├── markdown/                            # Markdown content for documentation, privacy policy, and terms of service
├── messages/                            # JSON translation files for all locales (en, ru)
├── mocks/                               # Mock data for Storybook
├── lib/
│   ├── actions/                         # Server Actions
│   ├── data/                            # Data Access Layer (DAL) and DTO models
│   ├── hooks/                           # Custom hooks
│   ├── schemas/                         # Validation schemas (Zod)
│   ├── swr/                             # SWR hooks for data fetching
│   ├── utils/                           # Util functions
│   ├── auth-client.ts                   # Better Auth client instance
│   ├── auth.ts                          # Better Auth server configuration
│   ├── mail.ts                          # Nodemailer configuration for sending emails
│   ├── permissions.ts                   # Roles and permissions
│   ├── prisma.ts                        # Prisma Client initialization
│   └── types.ts                         # Types for filtering, sorting, and contexts
├── prisma/                              # Prisma schema, migrations, and seed data
├── site/                                # Landing page and documentation components
├── ui/                                  # UI kit components
├── public/                              # Static assets
├── .env.development.example             # Env variables for development
├── .env.e2e.example                     # Env variables for e2e tests
├── .env.integration.example             # Env variables for integration tests
├── .env.production.example              # Env variables for production
├── cypress.config.ts
├── docker-compose.e2e.yml               # Docker Compose for e2e tests
├── docker-compose.integration.yml       # Docker Compose for integration tests
├── docker-compose.production.yml        # Docker Compose for production
├── Dockerfile                           # Dockerfile for app
├── Dockerfile.dbinit                    # Dockerfile for database initialization
├── Dockerfile.storybook                 # Dockerfile for Storybook
├── middleware.ts
├── next.config.ts
├── prisma.config.ts
├── vitest.config.ts
├── vitest.setup.integration.ts          # Vitest setup for integration tests
└── vitest.setup.ui.ts                   # Vitest setup for UI tests
```

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE).
