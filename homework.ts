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