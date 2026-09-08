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