export {};

// TypeScript Homework Part 2

// Skill 1 — Union Types
// Task 1 — ID Card

type IDType = number | string;

const showId = (id: IDType): string => {
  return `Your ID is: ${id}`;
};

console.log(showId(12345));
console.log(showId("ABC123"));


// Skill 2 — Interfaces & Type Aliases
// Task 2 — Book Interface

interface Book {
  title: string;
  pages: number;
}

const myBook: Book = {
  title: "Dune",
  pages: 412
};

const describeBook = (book: Book): string => {
  return `The book ${book.title} has ${book.pages} pages.`;
};

console.log(describeBook(myBook));