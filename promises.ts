// Callbacks and Promises Homework

// Skill 1 — Callbacks & Function Types
// Task 1 — Order Confirmation

type OrderCallback = () => void; // I make a type for the callback, it does not return anything

const placeOrder = (
  item: string, // the item must be text
  callback: OrderCallback // callback must use the OrderCallback type
): void => {
  console.log(`Order placed for ${item}`); // show what item was ordered
  callback(); // call the callback after the order is placed
};

placeOrder("Pizza", () => {
  console.log("Thanks for your order!"); // this is the message from the callback
});



// Skill 2 — Asynchronous Callbacks
// Task 2 — Countdown Timer


const countdown = (
  seconds: number, // how many seconds we want to wait
  callback: () => void // callback runs when timer is finished
): void => {
  setTimeout(() => {
    console.log("Time's up!");
    callback(); // call the callback
  }, seconds * 1000);
};

console.log("Countdown starts");

countdown(3, () => {
  console.log("Countdown finished.");
});

console.log("This line runs while we are waiting");


// Skill 3 — Callbacks That Return Values
// Task 3 — Temperature Converter

type ConvertCallback = (celsius: number) => number; // callback takes a number and gives back a number

const convertTemperature = (
  celsius: number,
  callback: ConvertCallback
): number => {
  return callback(celsius); // I want to return the converted temperature
};

const toFahrenheit: ConvertCallback = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

const toKelvin: ConvertCallback = (celsius: number): number => {
  return celsius + 273.15;
};

console.log(convertTemperature(20, toFahrenheit));
console.log(convertTemperature(20, toKelvin));




// Skill 4 — Promises
// Task 4 — Your Own Promise

const inStock: boolean = true; // I use this to decide if the item is available

const checkStock: Promise<string> = new Promise((resolve, reject) => {
  console.log("Checking stock..."); // this is inside the Promise

  if (inStock) {
    resolve(true); // first attempt - something is wrong here
  } else {
    reject("Item is not in stock");
  }
});

console.log("Promise was created"); // this is outside the Promise

checkStock
  .then((message: string) => {
    console.log(message); // show success message
  })
  .catch((error: string) => {
    console.log(error); // show error message
  });