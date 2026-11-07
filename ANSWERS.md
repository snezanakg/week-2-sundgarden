
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



## Exercise 2 - Testing chargeCustomer

### Question
What was the bug, and what does that tell you about testing error messages?

### Answer
The bug was a spelling mistake in the error message.
The word "customer" was written as "cutomer".

The function worked, but the error message was wrong.
The test helped me find the mistake.

This shows that we should also test error messages,
not just check if a function throws an error.
