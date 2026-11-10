
import "dotenv/config";
import * as Sentry from "@sentry/node";

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: "development",
    tracesSampleRate: 1.0,
  });

  console.log("Sentry initialized");
} else {
  console.warn("SENTRY_DSN is missing");
}
