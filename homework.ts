const studentName: string = "Snezana";
const studentAge: number = 40;
const isEnrolled: boolean = true;

console.log(studentName);
console.log(studentAge);
console.log(isEnrolled);

const describeStudent = (
  name: string,
  age: number
): string => {
  return `${name} is ${age} years old.`;
};

console.log(describeStudent(studentName, studentAge));

// Task 3 — Greeting with Optional Parameter

const formatGreeting = (
  name: string,
  formal?: boolean
): string => {
  if (formal) {
    return `Good day, ${name}.`;
  }

  return `Hi ${name}!`;
};

console.log(formatGreeting("Snezana", true));
console.log(formatGreeting("Snezana"));


// Task 4 — Ages with map()

const ages: number[] = [20, 25, 30, 35, 40];

const agesInFiveYears: number[] = ages.map(
  (age) => age + 5
);

console.log("Ages now:", ages);
console.log("Ages in five years:", agesInFiveYears); 


// Task 5 — Filtering Names

const names: string[] = [
  "Ana",
  "Luca",
  "Alice",
  "Mark",
  "Snezana",
  "John"
];

const shortNames: string[] = names.filter(
  (name) => name.length <= 4
);

console.log("Short names:", shortNames);