This repository contains my TypeScript homework assignments for the Sundsgården Backend Development course.

The exercises focus on learning the fundamentals of TypeScript and gradually introducing more advanced concepts such as union types, interfaces, enums, generics, array methods, and typed functions.

---

## About the Project

The purpose of this repository is to practice TypeScript by completing small exercises and learning how TypeScript improves JavaScript by adding type safety.

During these assignments I practiced:

- TypeScript syntax
- Typed variables
- Typed functions
- Function return types
- Optional parameters
- Arrays
- Array methods
- Interfaces
- Nested interfaces
- Optional properties
- Union types
- Type aliases
- Enums
- Generics
- Git and GitHub workflow
- Working with branches
- Pull requests and merging

---

# TypeScript Homework — Part 1

The first homework focuses on TypeScript fundamentals.

Main file:

```text
homework.ts
```

## Skills Practiced

### Typed Variables

I created variables with explicit TypeScript types:

```ts
const studentName: string = "Snezana";
const studentAge: number = 40;
const isEnrolled: boolean = true;
```

This helped me practice the basic TypeScript types:

- `string`
- `number`
- `boolean`

---

### Typed Functions

I created functions with typed parameters and return values.

Example:

```ts
function describeStudent(name: string, age: number): string {
  return `${name} is ${age} years old.`;
}
```

This demonstrates how TypeScript can specify:

- what type a function parameter must have
- what type the function must return

---

### Optional Parameters

I practiced optional function parameters using `?`.

Example:

```ts
function formatGreeting(name: string, formal?: boolean): string {
  if (formal) {
    return `Good day, ${name}.`;
  }

  return `Hi ${name}!`;
}
```

The `?` means that the parameter does not have to be provided.

---

### Typed Arrays

I practiced arrays containing specific types.

Example:

```ts
const ages: number[] = [20, 25, 30, 35, 40];
```

This means the array can contain only numbers.

---

### Using `map()`

I used `.map()` to transform every item in an array.

Example:

```ts
const agesInFiveYears = ages.map((age) => age + 5);
```

`.map()` creates a new array after changing each item.

---

### Using `filter()`

I used `.filter()` to keep only items that match a condition.

Example:

```ts
const shortNames = names.filter((name) => name.length <= 4);
```

`.filter()` creates a new array containing only the matching items.

---

### Interfaces

I created interfaces to describe the structure of objects.

Example:

```ts
interface Book {
  title: string;
  author: string;
  pages: number;
}
```

An interface works like a contract that tells TypeScript what properties an object should contain.

---

### Nested Interfaces

I practiced using one interface inside another.

Example:

```ts
interface Address {
  city: string;
  postalCode?: string;
}

interface Person {
  name: string;
  age: number;
  address: Address;
}
```

The `postalCode` property is optional because it uses `?`.

---

### Product Interface

I created a typed product structure containing:

- ID
- name
- price
- tags

Example:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
}
```

---

### Filtering Products

I practiced filtering products based on their price.

Example:

```ts
const affordableProducts = products.filter(
  (product) => product.price < 1000
);
```

---

### Chaining Array Methods

I combined `.filter()` and `.map()`.

Example:

```ts
const affordableProductNames = products
  .filter((product) => product.price < 1000)
  .map((product) => product.name);
```

This first selects the products and then transforms the result into product names.

---

## Part 1 Completed Tasks

1. Student profile with typed variables
2. Typed `describeStudent` function
3. Greeting function with an optional parameter
4. Number array using `.map()`
5. Name array using `.filter()`
6. Book interface
7. Address and Person interfaces
8. Product interface
9. Filtering products under 1000
10. Chaining `.filter()` and `.map()`

---

# TypeScript Homework — Part 2

The second homework builds on the TypeScript fundamentals and introduces additional TypeScript concepts.

Main file:

```text
homework-part2.ts
```

---

## Skill 1 — Union Types

### ID Card

I created a type that accepts either a number or a string.

```ts
type IDType = number | string;
```

The `|` symbol means **OR**.

An ID can therefore be:

```ts
12345
```

or:

```ts
"ABC123"
```

I also created a typed function:

```ts
const showId = (id: IDType): string => {
  return `Your ID is: ${id}`;
};
```

Example calls:

```ts
console.log(showId(12345));
console.log(showId("ABC123"));
```

Output:

```text
Your ID is: 12345
Your ID is: ABC123
```

---

## Skill 2 — Interfaces

### Book Interface

I created a `Book` interface:

```ts
interface Book {
  title: string;
  pages: number;
}
```

Then I created a book object:

```ts
const myBook: Book = {
  title: "Dune",
  pages: 412
};
```

I also created a function that receives a `Book` object:

```ts
const describeBook = (book: Book): string => {
  return `The book ${book.title} has ${book.pages} pages.`;
};
```

Output:

```text
The book Dune has 412 pages.
```

---

## Skill 3 — Enums

### Color Picker

I created an enum containing a fixed list of colors:

```ts
enum Color {
  Red,
  Green,
  Blue
}
```

Enums are useful when a value should only come from a predefined list.

I created a function:

```ts
const showColor = (color: Color): string => {
  return `You chose ${Color[color]}`;
};
```

Example:

```ts
console.log(showColor(Color.Red));
console.log(showColor(Color.Green));
console.log(showColor(Color.Blue));
```

Output:

```text
You chose Red
You chose Green
You chose Blue
```

---

## Skill 4 — Generics

### Wrap It Up

I created a generic function using `<T>`.

```ts
const wrapInArray = <T>(item: T): T[] => {
  return [item];
};
```

`T` acts as a reusable placeholder for a type.

The same function can therefore work with different types.

Example with a string:

```ts
wrapInArray("cat");
```

Result:

```text
["cat"]
```

Example with a number:

```ts
wrapInArray(42);
```

Result:

```text
[42]
```

---

## Part 2 Completed Skills

- Union Types
- Type Aliases
- Interfaces
- Enums
- Generics
- Typed arrow functions
- Function return types

---

# Project Structure

```text
week-2-sundgarden/
│
├── homework.ts
├── homework-part2.ts
├── package.json
├── tsconfig.json
├── README.md
└── node_modules/
```

`node_modules` is installed locally and should not normally be committed to GitHub.

---

# Technologies Used

- TypeScript
- JavaScript
- Node.js
- npm
- Git
- GitHub
- GitHub CLI
- Visual Studio Code
- WSL
- Ubuntu

---

# Installation

Clone the repository:

```bash
git clone https://github.com/snezanakg/week-2-sundgarden.git
```

Open the project:

```bash
cd week-2-sundgarden
```

Install dependencies:

```bash
npm install
```

---

# Compile TypeScript

Compile all TypeScript files:

```bash
npx tsc
```

TypeScript converts the `.ts` files into JavaScript files that Node.js can execute.

---

# Run Part 1

Compile the TypeScript:

```bash
npx tsc
```

Run:

```bash
node homework.js
```

---

# Run Part 2

Compile:

```bash
npx tsc
```

Run:

```bash
node homework-part2.js
```

Example output:

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

# Git Workflow

Git and GitHub were also used throughout the assignments.

Each homework assignment is developed on its own branch before being merged into `main`.

Branches used:

```text
main
typescrypt-homework
typescript
```

### `main`

Contains completed and merged work.

### `typescrypt-homework`

Used for the first TypeScript homework assignment.

### `typescript`

Used for TypeScript Homework Part 2.

The assignment branches are kept in the repository after merging so the development history for each assignment remains available.

---

# Git Commands Used

Check the current repository status:

```bash
git status
```

View branches:

```bash
git branch
```

Create a branch:

```bash
git checkout -b branch-name
```

Switch branches:

```bash
git checkout branch-name
```

Stage a file:

```bash
git add filename
```

Create a commit:

```bash
git commit -m "Commit message"
```

Push the branch to GitHub:

```bash
git push
```

Push a new branch and connect it to GitHub:

```bash
git push -u origin branch-name
```

Download updates:

```bash
git pull
```

Update information about remote branches:

```bash
git fetch origin
```

---

# GitHub Workflow

For the assignments I practiced:

1. Creating a separate branch
2. Writing the TypeScript code
3. Testing the code
4. Checking changes with Git
5. Staging completed work
6. Creating commits
7. Pushing commits to GitHub
8. Creating a Pull Request
9. Resolving merge conflicts when necessary
10. Merging the Pull Request into `main`
11. Keeping the assignment branch for the project history

---

# What I Learned

Through these assignments I learned that TypeScript helps make JavaScript code safer and easier to understand.

Some of the most important concepts I practiced were:

- `string` represents text
- `number` represents numbers
- `boolean` represents `true` or `false`
- `?` makes a parameter or property optional
- `|` means OR
- `&` means AND when combining types
- `[]` represents an array
- interfaces define the expected structure of objects
- enums create a fixed set of named values
- generics allow functions and types to work with different data types
- `.map()` transforms every item in an array
- `.filter()` keeps items that match a condition
- TypeScript can detect type errors before the JavaScript code is executed

---

# Repository

GitHub:

```text
https://github.com/snezanakg/week-2-sundgarden
```

---

# Author

**Snezana Kragujevac**

Backend Development Student  
Sundsgården