# Week 12 – Continuous Integration with GitHub Actions

## Exercise 1 – My First Workflow

I created my first GitHub Actions workflow to automatically run the tests from my Week 10 TDD project.

**What do `on`, `runs-on`, `strategy.matrix`, and `steps` do?**

- `on` tells GitHub when to start the workflow, for example when someone pushes code or opens a pull request.
- `runs-on` decides which operating system the job uses. I used Ubuntu.
- `strategy.matrix` lets me run the same tests with different Node.js versions.
- `steps` are the individual actions GitHub performs, such as downloading the code, installing dependencies, and running tests.

**Why did nothing happen when only pushing the branch?**

It depends on how the workflow is configured. If it only listens for pull requests, pushing a branch won't start anything until a matching pull request is opened.

In my workflow, I included a push trigger for `week12/ci-clean`, so my tests started automatically when I pushed.

## Exercise 2 – Read the Report

My first CI workflow ran successfully on GitHub.

**How many jobs ran, and why?**

Three jobs ran because I used three Node.js versions: 22.x, 24.x, and 26.x.

All three jobs passed. Each job ran 34 tests across 5 test files, including my library and pizza shop tests.

**Why can tests pass locally but fail in CI?**

Tests can behave differently because my computer and GitHub Actions might use different operating systems, Node.js versions, dependencies, or environment variables.

For example, my tests might work on Windows but have problems on Ubuntu. CI helps catch these differences before code gets merged.
## Exercise 3 – Red on Purpose

For this exercise, I created a separate branch called `week12/red` and added a test that intentionally failed.

The test expected `2 + 2` to equal `5`, even though the correct answer is `4`.

I opened Pull Request #17 and checked the GitHub Actions results. The Node.js 22 job failed, while the other two jobs were cancelled because of the matrix fail-fast behavior.

In the logs, I found the error:

`AssertionError: expected 4 to be 5`

I corrected the test to expect `4`, ran the tests locally, and got all 35 tests passing.

After pushing the fix, all three GitHub Actions jobs turned green. I then merged the pull request into `week12/ci-clean`.

**Why is a red CI check useful?**

A red check tells me something is wrong before I merge code into the main assignment branch. It helps me find errors early instead of discovering them later when the application is running.

## Exercise 4 – Check Types in CI

For this exercise, I added `npm run typecheck` to my GitHub Actions workflow, between installing dependencies and running tests.

The script was already in `package.json`, so I only needed to update `ci.yml`.

I tested it by adding this line to `library.ts`:

`const copies: number = "three";`

TypeScript found an error because I assigned a string to a number.

GitHub Actions also detected the error and stopped before running the tests.

After removing the incorrect line, I ran the type check and tests again. Everything passed locally, and all three CI jobs turned green.

I merged Pull Request #18 into `week12/ci-clean`.

**Would this step have caught the possibly null bug from Week 11, Exercise 9?**

It could have caught the bug if TypeScript knew that the value might be `null` and strict null checking was enabled.

However, type checking cannot catch every runtime error. It depends on how the values and types are defined.