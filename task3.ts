// Task 3 - Delayed Message

const delayedMessage = (
  message: string,
  seconds: number
): Promise<string> => {
  // this function should return a Promise with a string

  return new Promise((resolve) => {
  });
};



const delayedMessage = (
  message: string,
  seconds: number
): Promise<string> => {
  // this function should return a Promise with a string

  return new Promise((resolve) => {
    setTimeout(() => {
      // after waiting, I will resolve the Promise
    }, seconds * 1000); // change seconds to milliseconds
  });
};




const delayedMessage = (
  message: string,
  seconds: number
): Promise<string> => {
  // this function should return a Promise with a string

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message); // after waiting, send back the message
    }, seconds * 1000); // change seconds to milliseconds
  });
};