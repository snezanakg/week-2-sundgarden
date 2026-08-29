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



// Task 6 — Book Interface

interface Book {
  title: string;
  author: string;
  pages: number;
}

const book: Book = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pages: 310
};

console.log("Book:", book);
console.log("Book title:", book.title);


// Task 7 — Address and Person Interfaces

interface Address {
  city: string;
  postalCode?: string;
}

interface Person {
  name: string;
  age: number;
  address: Address;
}

const person1: Person = {
  name: "Snezana",
  age: 40,
  address: {
    city: "Gothenburg",
    postalCode: "41101"
  }
};

const person2: Person = {
  name: "Alice",
  age: 8,
  address: {
    city: "Gothenburg"
  }
};

console.log("Person 1:", person1);
console.log("Person 2:", person2);

// Task 8 — Product Interface

interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    tags: ["electronics", "computer"]
  },
  {
    id: 2,
    name: "Mouse",
    price: 300,
    tags: ["electronics", "accessory"]
  },
  {
    id: 3,
    name: "Keyboard",
    price: 700,
    tags: ["electronics", "accessory"]
  },
  {
    id: 4,
    name: "Desk",
    price: 1500,
    tags: ["furniture"]
  },
  {
    id: 5,
    name: "Chair",
    price: 800,
    tags: ["furniture", "office"]
  }
];


// Task 9 — Filter Products Under 1000

const productsUnder1000: Product[] = products.filter(
  (product) => product.price < 1000
);

console.log("Products under 1000:", productsUnder1000);


// Task 10 — Filter + Map Chaining

const affordableProductNames: string[] = products
  .filter((product) => product.price < 1000)
  .map((product) => product.name);

console.log("Affordable product names:", affordableProductNames);