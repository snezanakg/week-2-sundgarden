// Callbacks Homework

// Task 1 — Hello Callback

type helloFunction = (message: string) => void;

const helloCallback = (callback: helloFunction): void => {
  callback("Hello from callback!");
};

const showHello: helloFunction = (message: string): void => {
  console.log(message);
};

helloCallback(showHello);