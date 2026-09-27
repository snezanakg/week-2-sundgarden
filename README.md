# Random Person API Homework

A small Express and TypeScript API using the Random User API and Zod validation.

## Features

- `GET /ping`
- `GET /random-person`
- `POST /users`
- `GET /random-login` - optional challenge
- Zod validation
- Error handling with status codes `200`, `201`, `400` and `500`

## Install

```bash
npm install
```

## Start the server

```bash
npx tsx server/server.ts
```

The server runs on:

```text
http://localhost:3000
```

## Testing

The API was tested in Insomnia.

### GET /ping - 200 OK

![Ping 200](docs/screenshots/ping-200.png)

### GET /random-person - 200 OK

![Random Person 200](docs/screenshots/random-person-200.png)

### POST /users - 201 Created

![Users 201](docs/screenshots/users-201.png)

### POST /users - 400 Bad Request

![Users 400](docs/screenshots/users-400.png)

### GET /random-login - 200 OK

![Random Login 200](docs/screenshots/random-login-200.png)

### GET /random-person - 500 Internal Server Error

![Random Person 500](docs/screenshots/random-person-500.png)