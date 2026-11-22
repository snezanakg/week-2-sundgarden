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