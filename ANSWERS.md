
# Week 11 - Sentry

## Exercise 1 - Install the alarm system

### Why must instrument.ts be imported before everything else?

Sentry needs to start before Express and the other parts of
the application. This allows it to monitor the app from
the beginning and catch errors correctly.

### Why do we keep the DSN in .env instead of the code?

We keep the DSN in .env so we don't have to write
configuration details directly in our code.

It also makes it easier to use different Sentry projects
for development and production.

## Exercise 2 - Your first error report

### What information did Sentry record automatically?

Sentry recorded the error message, the file and line
where the error happened, and the stack trace.

It showed that the error came from index.ts on line 518
when I visited GET /debug-sentry.

It also recorded the environment (development),
Node.js version (20.19.2), operating system (Windows),
request URL, browser information and breadcrumbs.

This helped me understand where the error happened
without adding that information manually.
