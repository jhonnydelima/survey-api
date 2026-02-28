# Survey API

A Node.js backend application for a survey system built with TypeScript, following clean architecture principles and test-driven development (TDD).

## Project Status

⚠️ **Work in Progress** - This project is still under active development.

## Current Features

### Authentication & User Management

- **SignUp Controller** - Handles user registration with validation
  - Email validation using the `validator` library
  - Password confirmation matching
  - Required field validation (name, email, password, passwordConfirmation)

### Core Components

#### Presentation Layer

- [`SignUpController`](src/presentation/controllers/signup/signup.ts) - REST endpoint for user registration
- Error handling with custom errors ([`MissingParamError`](src/presentation/errors/missing-param-error.ts), [`InvalidParamError`](src/presentation/errors/invalid-param-error.ts), [`ServerError`](src/presentation/errors/server-error.ts))
- HTTP helper utilities for standardized responses

#### Data Layer

- [`DbAddAccount`](src/data/usecases/add-account/db-add-account.ts) - Use case for account creation with password encryption
- Repository pattern for data persistence

#### Domain Layer

- [`AccountModel`](src/domain/models/account.ts) - Account data structure
- [`AddAccount`](src/domain/usecases/add-account.ts) - Core business logic interface

#### Utilities

- [`EmailValidatorAdapter`](src/utils/email-validator-adapter.ts) - Email validation adapter wrapping the `validator` library

## Testing

The project uses **Jest** with TypeScript support:

- **Unit Tests** - Run with `jest-unit.config.js` (`.spec.ts` files)
- **Integration Tests** - Run with `jest-integration.config.js` (`.test.ts` files)
- Code coverage tracking enabled

## Project Structure

```
src/
├── data/           # Data layer (repositories, use cases)
├── domain/         # Domain layer (models, interfaces)
├── presentation/   # Presentation layer (controllers, protocols)
└── utils/          # Utility adapters
```

## Next Steps

- Database integration
- Authentication/JWT implementation
- Additional API endpoints
- API documentation
- Deployment configuration
