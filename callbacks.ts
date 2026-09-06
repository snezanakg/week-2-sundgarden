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

// Task 2 — Delayed Greeting

type greetingFunction = (message: string) => void;

const sayHelloLater = (callback: greetingFunction): void => {
  setTimeout(() => {
    callback("Hi, I am late!");
  }, 2000);
};

const showGreeting: greetingFunction = (message: string): void => {
  console.log(message);
};

sayHelloLater(showGreeting);



// Task 3 — Math Callback

type mathFunction = (result: number) => void;

const addNumbers = (
  num1: number,
  num2: number,
  callback: mathFunction
): void => {
  const result = num1 + num2;
  callback(result);
};

const showResult: mathFunction = (result: number): void => {
  console.log(`The result is: ${result}`);
};

addNumbers(5, 10, showResult);


// Task 4 — Uppercase Callback

type uppercaseFunction = (text: string) => void;

const makeUppercase = (
  text: string,
  callback: uppercaseFunction
): void => {
  const upperText = text.toUpperCase();
  callback(upperText);
};

const showUppercase: uppercaseFunction = (text: string): void => {
  console.log(text);
};

makeUppercase("hello callback", showUppercase);




// Task 5 — Pizza Order

type pizzaCallback = (message: string) => void;

const orderPizza = (
  pizzaName: string,
  callback: pizzaCallback
): void => {
  console.log(`Ordering ${pizzaName}...`);

  setTimeout(() => {
    callback(`Your ${pizzaName} pizza is ready!`);
  }, 2000);
};

const showPizzaMessage: pizzaCallback = (message: string): void => {
  console.log(message);
};

orderPizza("Margherita", showPizzaMessage);