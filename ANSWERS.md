
# Week 11 - SonarQube Answers

## Exercise 1 - SonarQube in Docker

### What does docker ps show?

The docker ps command shows running containers.
The STATUS column shows that SonarQube is running.
The PORTS column shows that it uses port 9000.

### Why use Docker instead of installing SonarQube directly?

Docker makes SonarQube easier to install and manage.
It keeps SonarQube separate from my computer's
other applications and makes it easier to restart.



## Exercise 2 - My First Scan

### Did the project pass or fail the quality gate?

My project passed the quality gate.

### How many issues did SonarQube find?

SonarQube found 0 issues in the first scan.

The project has 660 lines of code, 5.1% duplication,
and 0% test coverage.


## Exercise 3 - Read Before You Fix

### Issue 1 - Top-level await

Rule: typescript:S7785
File: sync-loan-tables.ts
Line: 33
Severity: Medium
Category: Maintainability

SonarQube found `void createTables();`.

The function is asynchronous, but the code does not wait
for its Promise to finish.

Suggested improvement:
`await createTables();`

I agree with SonarQube because top-level await makes
the code easier to understand and handles the asynchronous
operation more clearly.

### Issue 2 - Unsafe string conversion

Rule: Avoid Object's default stringification
File: index.ts
Line: 73
Severity: Low
Category: Maintainability

SonarQube found that String(sort) might convert
an object into "[object Object]".

This can happen because query parameters do not
always contain simple strings.

Suggested improvement:
Check that sort is a string before using it
in the allowedSorts validation.

I agree with SonarQube because explicit type checking
makes the API safer and the code easier to understand.

### Issue 3 - Deprecated Sentry function

Rule: Avoid deprecated APIs
File: index.ts
Line: 585
Severity: Low
Category: Maintainability

SonarQube found that the Sentry.setupExpressErrorHandler()
function uses a deprecated signature.

This means the function may be removed or changed
in a future version of Sentry.

Suggested improvement:
Check the installed Sentry SDK version and migrate
to the supported Express integration when appropriate.

I agree with SonarQube because using supported APIs
makes the code easier to maintain and update.



### What is the difference between security, reliability, and maintainability?

Security means protecting the application and its data
from attacks or unauthorized access.

Reliability means making sure the application works
correctly without unexpected failures.

Maintainability means keeping the code easy to understand,
update, and improve.

### What is the difference between SonarQube, tests, and Sentry?

SonarQube analyzes code to find potential quality,
security, and maintainability problems.

Tests check whether the application behaves as expected.

Sentry monitors errors while the application is running
and helps developers investigate them.

These tools work together, but they have different purposes.

## Exercise 4 - Scanner Configuration

### Why should we keep the SonarQube token out of the code?

A SonarQube token is used for authentication.
If we write it directly in the source code and push it
to GitHub, other people might be able to use it.

I stored my token in a private .env file instead.
The .env file is ignored by Git, so it will not
be included in normal commits.

I also created .env.example to show which environment
variables are needed without exposing their values.

### Why use sonar-project.properties?

The sonar-project.properties file stores the
configuration for the SonarQube scanner.

It specifies the project key, project name,
version, and location of the source code.

This makes the configuration easier to manage
and means I do not need to type all the settings
manually every time.

### How did I run the analysis?

I installed @sonar/scan and dotenv-cli as
development dependencies.

I added an npm script that loads the environment
variables from .env and starts SonarScanner.

I ran:

npm run sonar

The analysis completed successfully using the
Sonar way comprehensive TypeScript quality profile.

## Exercise 5 - Scan Only Your Code

### Why should we exclude generated files and dependencies?

We should exclude generated files and dependencies because
they are not part of the source code we directly maintain.

Scanning them can add unnecessary files to the analysis,
produce irrelevant findings, and make the results harder
to understand.

### Which files did I exclude?

I configured sonar.exclusions in sonar-project.properties
to exclude:

- node_modules/** - installed dependencies
- dist/** - compiled output
- coverage/** - generated test coverage reports
- .scannerwork/** - temporary SonarQube scanner files
- screenshots/** - assignment screenshots

### What changed after applying the exclusions?

Before adding exclusions, SonarQube indexed 23 files.

After adding exclusions, it indexed 17 files.

The number of TypeScript source files analyzed stayed
the same at 9.

The analysis completed successfully, confirming that
unnecessary files were excluded while my TypeScript
source code remained included.
