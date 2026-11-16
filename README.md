
# Week 11 - SonarQube Assignment

## About the Assignment

For this assignment, I used SonarQube to analyze a
TypeScript and Express backend application.

The goal was to learn how static code analysis works,
identify code quality issues, and configure the scanner
to analyze the correct files.

I completed Exercises 1-5.

## Technologies Used

- TypeScript
- Node.js
- Express
- Docker
- SonarQube Community Build
- SonarScanner for NPM
- dotenv-cli
- Git and GitHub

## Exercises

### Exercise 1 - Set Up SonarQube

I started SonarQube locally using Docker and accessed
the dashboard at http://localhost:9000.

### Exercise 2 - Run the First Scan

I connected the scanner to SonarQube and ran my
first code analysis.

I explored the dashboard and checked the Quality Gate,
code issues, and other analysis results.

### Exercise 3 - Investigate Issues

I created a new SonarQube project and used the
Sonar way comprehensive TypeScript quality profile.

SonarQube found 5 maintainability issues:
- 1 Medium
- 4 Low

Some issues involved asynchronous code, converting
values to strings, and a deprecated Sentry function.

I documented three issues in ANSWERS.md.

### Exercise 4 - Configure the Scanner

I created a sonar-project.properties file and added
an npm script to run the scanner.

The SonarQube token is stored in a private .env file
that is ignored by Git.

An .env.example file shows the required variables
without exposing the token.

### Exercise 5 - Exclude Unnecessary Files

I configured SonarQube to exclude dependencies,
generated files, and screenshots.

Before the exclusions: 23 files indexed.
After the exclusions: 17 files indexed.

All 9 TypeScript source files were still analyzed.

## How to Run the Scan

Requirements:
- Node.js and npm
- Docker
- A running local SonarQube server

1. Install dependencies:

   npm install

2. Start SonarQube with Docker Compose:

   docker compose up -d

3. Create a .env file with these variables:

   SONAR_HOST_URL=http://localhost:9000
   SONAR_TOKEN=your_own_token_here

4. Run the scanner:

   npm run sonar

The scanner uses the configuration in
sonar-project.properties.

## Results

- SonarQube project key: week11-sonarqube-new
- Quality Gate: Passed
- Maintainability issues found: 5
- Security issues reported: 0
- Reliability issues reported: 0
- TypeScript files analyzed: 9
- Files indexed after exclusions: 17

## Screenshots and Answers

Screenshots are available in the screenshots folder.

Examples:
- screenshots/exercise2-overview.png
- screenshots/issue1.png
- screenshots/issue2.png
- screenshots/issue3.png
- screenshots/exercise4-scan.png
- screenshots/exercise5-scan.png

My explanations and exercise answers are in ANSWERS.md.

## Problems I Had

I had authentication problems with my first SonarQube
project and received a 401 Unauthorized error.

I created a new project and repeated the analysis.
Later, I discovered that my .env file had an empty token.

After fixing the environment configuration, the scanner
worked successfully.

This assignment helped me understand static analysis,
code quality rules, authentication, and how to configure
SonarQube for a TypeScript project.
 Author:Snezana Kragujevac