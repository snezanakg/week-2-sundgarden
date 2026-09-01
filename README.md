# TypeScript Homework

This repository contains my TypeScript homework for the Sundsgården Backend Development course.

In these assignments I practiced the basics of TypeScript and how to use types in JavaScript projects.

## What I learned

During the homework I practiced:

- strings
- numbers
- booleans
- typed variables
- typed functions
- optional parameters
- arrays
- `map()`
- `filter()`
- interfaces
- union types
- enums
- generics
- Git and GitHub

---

## Homework Part 1

The first homework is in:

```text
homework.ts
```

In this homework I practiced basic TypeScript.

### Tasks

I worked with:

- typed variables
- functions with typed parameters
- function return types
- optional parameters
- arrays
- `map()`
- `filter()`
- interfaces
- nested interfaces
- optional properties
- product objects
- chaining `filter()` and `map()`

Example:

```ts
const studentName: string = "Snezana";
const studentAge: number = 40;
const isEnrolled: boolean = true;
```

I also practiced interfaces:

```ts
interface Book {
  title: string;
  author: string;
  pages: number;
}
```

And array methods like:

```ts
const agesInFiveYears = ages.map((age) => age + 5);
```

and:

```ts
const shortNames = names.filter((name) => name.length <= 4);
```

---

## Homework Part 2

The second homework is in:

```text
homework-part2.ts
```

For this homework I had to choose at least one task from each skill.

I completed four tasks.

### 1. Union Types

I created an ID type that can be a number or a string.

```ts
type IDType = number | string;
```

Then I created a function:

```ts
const showId = (id: IDType): string => {
  return `Your ID is: ${id}`;
};
```

I tested it with both:

```ts
console.log(showId(12345));
console.log(showId("ABC123"));
```

---

### 2. Interfaces

I created a `Book` interface:

```ts
interface Book {
  title: string;
  pages: number;
}
```

Then I created a book:

```ts
const myBook: Book = {
  title: "Dune",
  pages: 412
};
```

I also created a function to describe the book:

```ts
const describeBook = (book: Book): string => {
  return `The book ${book.title} has ${book.pages} pages.`;
};
```

---

### 3. Enums

I created an enum with three colors:

```ts
enum Color {
  Red,
  Green,
  Blue
}
```

Then I created a function:

```ts
const showColor = (color: Color): string => {
  return `You chose ${Color[color]}`;
};
```

I tested all three colors.

---

### 4. Generics

I created a generic function that puts an item inside an array.

```ts
const wrapInArray = <T>(item: T): T[] => {
  return [item];
};
```

I tested it with a string and a number:

```ts
console.log(wrapInArray("cat"));
console.log(wrapInArray(42));
```

---

## How to run the project

Install dependencies:

```bash
npm install
```

Compile TypeScript:

```bash
npx tsc
```

Run Part 1:

```bash
node homework.js
```

Run Part 2:

```bash
node homework-part2.js
```

---

## Part 2 Output

```text
Your ID is: 12345
Your ID is: ABC123
The book Dune has 412 pages.
You chose Red
You chose Green
You chose Blue
[ 'cat' ]
[ 42 ]
```

---

## Git

I used Git and GitHub during the homework.

I practiced:

- creating branches
- checking changes with `git status`
- adding files
- committing changes
- pushing to GitHub
- creating pull requests
- merging branches

Branches used:

```text
main
typescrypt-homework
typescript
```

`typescrypt-homework` was used for the first homework.

`typescript` was used for TypeScript Homework Part 2.

---

## Technologies

- TypeScript
- Node.js
- npm
- Git
- GitHub
- VS Code
- WSL / Ubuntu

---

## Author

Snezana Kragujevac

Sundsgården Backend Development