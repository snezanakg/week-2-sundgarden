// Task 3 - Delayed Message

const delayedMessage = (
  message: string,
  seconds: number
): Promise<string> => {
  // this function should return a Promise with a string

 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message); // after waiting, send back the message
    }, seconds * 1000); // change seconds into milliseconds
  });
};


const runDelayedMessage = async (): Promise<void> => {
  // async lets me use await inside this function

  console.log("Waiting..."); // this shows first

  const result = await delayedMessage("Hello after 2 seconds!", 2);
  // wait until the Promise finishes

  console.log(result); // show the message after the delay
};

runDelayedMessage(); // start the function
