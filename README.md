# Week 11 - Sentry Error Monitoring

A TypeScript Express library API using Sequelize,
PostgreSQL, and Sentry for error monitoring.

## Features

- REST API for books, authors, and loans
- Automatic and manual error reporting
- Breadcrumbs and feature tags
- Reusable `reportError()` helper
- Error handling and validation

## Setup

1. Run `npm install`.
2. Configure `.env` with database credentials and `SENTRY_DSN`.
3. Start PostgreSQL.
4. Run `npm run dev`.

API: http://localhost:3001

## Testing

Run `npm run typecheck` to check TypeScript.

Screenshots are saved in `screenshots/`.
Exercise explanations are in `ANSWERS.md`.

## Technologies

TypeScript, Node.js, Express, Sequelize,
PostgreSQL, Sentry, Docker.
 Author:Snezana Kragujevac