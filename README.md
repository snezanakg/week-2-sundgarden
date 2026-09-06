# Week 3 - Callbacks

This repository contains my Week 3 callbacks homework for the Sundsgården Backend Development course.

In this lesson I practiced how callbacks work in TypeScript.

A callback is a function that is passed into another function and called later.

## What I practiced

In this homework I worked with:

- callback functions
- type aliases for callbacks
- arrow functions
- typed parameters
- return types
- `setTimeout()`
- passing functions as arguments
- calling callbacks inside other functions
- working without `any`

The main file for this assignment is:

```text
callbacks.ts
```

---

## Task 1 - Hello Callback

In the first task I created a simple callback.

I created a type for the callback:

```ts
type helloFunction = (message: string) => void;
```

Then I created a main function that accepts the callback:

```ts
const helloCallback = (callback: helloFunction): void => {
  callback("Hello from callback!");
};
```

I also created a separate callback function:

```ts
const showHello: helloFunction = (message: string): void => {
  console.log(message);
};
```

Then I passed the callback into the main function:

```ts
helloCallback(showHello);
```

Output:

```text
Hello from callback!
```

---

## Task 2 - Delayed Greeting

In this task I practiced using a callback together with `setTimeout()`.

```ts
type greetingFunction = (message: string) => void;
```

The function waits 2 seconds before calling the callback:

```ts
const sayHelloLater = (callback: greetingFunction): void => {
  setTimeout(() => {
    callback("Hi, I am late!");
  }, 2000);
};
```

The callback prints the message:

```ts
const showGreeting: greetingFunction = (message: string): void => {
  console.log(message);
};
```

Then I call:

```ts
sayHelloLater(showGreeting);
```

After 2 seconds the output is:

```text
Hi, I am late!
```

---

## Task 3 - Math Callback

In this task I created a callback that works with a number.

```ts
type mathFunction = (result: number) => void;
```

The main function takes two numbers, adds them, and sends the result to the callback:

```ts
const addNumbers = (
  num1: number,
  num2: number,
  callback: mathFunction
): void => {
  const result = num1 + num2;
  callback(result);
};
```

The callback prints the result:

```ts
const showResult: mathFunction = (result: number): void => {
  console.log(`The result is: ${result}`);
};
```

I tested it with:

```ts
addNumbers(5, 10, showResult);
```

Output:

```text
The result is: 15
```

---

## Task 4 - Uppercase Callback

In this task I changed text to uppercase and then passed the result to a callback.

```ts
type uppercaseFunction = (text: string) => void;
```

The main function:

```ts
const makeUppercase = (
  text: string,
  callback: uppercaseFunction
): void => {
  const upperText = text.toUpperCase();
  callback(upperText);
};
```

The callback:

```ts
const showUppercase: uppercaseFunction = (text: string): void => {
  console.log(text);
};
```

I tested it with:

```ts
makeUppercase("hello callback", showUppercase);
```

Output:

```text
HELLO CALLBACK
```

---

## Task 5 - Pizza Order

In this task I used a callback and `setTimeout()` to simulate waiting for a pizza order.

```ts
type pizzaCallback = (message: string) => void;
```

The main function first shows that the pizza is being ordered:

```ts
console.log(`Ordering ${pizzaName}...`);
```

Then after 2 seconds it calls the callback:

```ts
setTimeout(() => {
  callback(`Your ${pizzaName} pizza is ready!`);
}, 2000);
```

The callback prints the final message:

```ts
const showPizzaMessage: pizzaCallback = (message: string): void => {
  console.log(message);
};
```

I tested it with:

```ts
orderPizza("Margherita", showPizzaMessage);
```

Output:

```text
Ordering Margherita...
Your Margherita pizza is ready!
```

---

## What I learned

The main thing I learned in this assignment is that a callback is a function that can be passed into another function.

Instead of running everything directly, the main function can decide when to call the callback.

For example:

```ts
callback(result);
```

means that the main function sends a result to another function.

I also learned that `setTimeout()` can be used when I want something to happen after a delay.

Example:

```ts
setTimeout(() => {
  callback("Done!");
}, 2000);
```

This waits 2 seconds before calling the callback.

---

## Important things to remember

- a callback is still just a function
- callbacks can be passed as arguments
- callback types can be defined with a type alias
- `void` means the function does not return a value
- arrow functions use `=>`
- `setTimeout()` runs code after a delay
- I should avoid using `any`
- TypeScript helps make sure the callback receives the correct type

---

## How to run the assignment

Compile the TypeScript:

```bash
npx tsc callbacks.ts
```

Run the JavaScript:

```bash
node callbacks.js
```

Example output:

```text
Hello from callback!
The result is: 15
HELLO CALLBACK
Ordering Margherita...
Hi, I am late!
Your Margherita pizza is ready!
```

The delayed messages can appear later because of `setTimeout()`.

---

## Git branch

This assignment was made on the branch:

```text
week3/callbacks
```

I used Git and GitHub to:

- create a separate branch
- commit each task
- push the work to GitHub
- keep the assignment separate from the other homework

---

## Technologies

- TypeScript
- JavaScript
- Node.js
- Git
- GitHub
- VS Code
- WSL / Ubuntu

---

## Author

Snezana Kragujevac

Sundsgården Backend Development