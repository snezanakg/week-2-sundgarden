
import * as Sentry from "@sentry/node";

export const reportError = (
  error: unknown,
  feature: string
): void => {
  Sentry.withScope((scope) => {
    scope.setTag("feature", feature);
    Sentry.captureException(error);
  });
};
