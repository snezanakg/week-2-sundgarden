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