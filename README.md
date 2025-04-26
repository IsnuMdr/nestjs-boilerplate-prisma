# NestJS Prisma Boilerplate

A modern, production-ready boilerplate for building scalable NestJS applications with Prisma ORM, following industry-standard design patterns and best practices.

## Features

- **NestJS** - Progressive Node.js framework for building efficient and scalable server-side applications
- **Prisma ORM** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Powerful, open-source relational database system
- **Swagger Documentation** - API documentation with OpenAPI specification
- **Request Validation** - Input validation using class-validator and class-transformer
- **Repository Pattern** - Separation of data access logic
- **Dependency Injection** - Built-in NestJS DI system
- **Error Handling** - Global exception filters for consistent error responses
- **Environment Configuration** - Using @nestjs/config for flexible environment configuration
- **CORS Support** - Cross-Origin Resource Sharing enabled
- **API Response Transformation** - Consistent API response format
- **Testing Setup** - Jest setup for unit and e2e testing

## Project Structure

```
nestjs-prisma-boilerplate/
├── prisma/                    # Prisma configuration and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── common/                # Shared utilities, constants, filters, guards, etc.
│   │   ├── constants/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/                # Configuration modules
│   │   └── app.config.ts
│   ├── modules/               # Feature modules
│   │   └── users/             # Example feature module
│   │       ├── dto/           # Data Transfer Objects
│   │       ├── entities/      # Entity definitions
│   │       ├── repositories/  # Repository pattern implementation
│   │       ├── services/      # Business logic
│   │       ├── controllers/   # HTTP endpoints
│   │       └── users.module.ts
│   ├── prisma/                # Prisma service module
│   │   └── prisma.service.ts
│   ├── app.module.ts          # Root application module
│   └── main.ts                # Application entry point
├── test/                      # Test files
│   ├── e2e/
│   └── jest/
├── .env                       # Environment variables
├── .env.example               # Example environment variables
└── other config files...
```

## Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/IsnuMdr/nestjs-prisma-boilerplate.git
cd nestjs-prisma-boilerplate
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database connection details and other configuration.

### Database Setup

1. Create a PostgreSQL database:

```bash
createdb nestjs_prisma_boilerplate
```

2. Run database migrations:

```bash
npm run prisma:migrate:dev
# or
yarn prisma:migrate:dev
```

3. Seed the database with initial data:

```bash
npm run prisma:seed
# or
yarn prisma:seed
```

### Running the Application

Start the application in development mode:

```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at http://localhost:3000/api.
Swagger documentation will be available at http://localhost:3000/api/docs.

## API Endpoints

The boilerplate comes with a fully implemented Users module with the following endpoints:

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a user by ID
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## Development

### Generate Prisma Client

After changing the Prisma schema, generate the Prisma client:

```bash
npm run prisma:generate
# or
yarn prisma:generate
```

### Database Migrations

Create a new migration:

```bash
npm run prisma:migrate:dev -- --name migration_name
# or
yarn prisma:migrate:dev --name migration_name
```

### Prisma Studio

Open Prisma Studio to explore your database:

```bash
npm run prisma:studio
# or
yarn prisma:studio
```

## Testing

### Running Tests

Run unit tests:

```bash
npm run test
# or
yarn test
```

Run e2e tests:

```bash
npm run test:e2e
# or
yarn test:e2e
```

Run tests with coverage:

```bash
npm run test:cov
# or
yarn test:cov
```

## Building for Production

1. Build the application:

```bash
npm run build
# or
yarn build
```

2. Start the production server:

```bash
npm run start:prod
# or
yarn start:prod
```

## Design Patterns

This boilerplate follows these key design patterns:

1. **Repository Pattern**: The data access logic is separated from business logic through repositories.
2. **Dependency Injection**: NestJS's built-in DI container is used for managing dependencies.
3. **Module Pattern**: Code is organized into feature modules.
4. **DTO Pattern**: Data Transfer Objects validate incoming data.
5. **Entity Pattern**: Entities represent domain models and control data transformation.

## Adding New Features

To add a new feature module:

1. Create a new directory in the `src/modules` folder
2. Define entities, DTOs, controllers, services, and repositories
3. Create a module file that imports and exports your components
4. Import your module in the `app.module.ts` file

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
