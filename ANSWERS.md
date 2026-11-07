
# Week 10 - Unit Tests, Integration Tests and Zod

## Exercise 1 - Vegetarian Pizza

### Question
Which schema stopped the test, and why? Why did Vitest run even though TypeScript showed an error?

### Answer
The PizzaSchema stopped the test because the vegetarian pizza
was not added to the menu yet. Its price was undefined, but
the schema expected a number.

TypeScript showed an error because the menu did not have
a vegetarian property.

Vitest still ran the code because TypeScript checks types
during development, while Zod validates data at runtime.
Vitest does not automatically run the TypeScript type checker.
