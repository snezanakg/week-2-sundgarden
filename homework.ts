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