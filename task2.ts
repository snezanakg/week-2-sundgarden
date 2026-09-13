// Task 2 - Resolve or Reject

const checkNumber = (value: number): Promise<string> => {
  // this function returns a Promise with a string result

  return new Promise((resolve, reject) => {
    // resolve = success
    // reject = error / failed case

    if (value > 0) {
      resolve("The number is positive"); // success message
    } else {
      reject("The number is not positive"); // error message
    }
  });
};

const runCheckNumber = async (): Promise<void> => {
  // async lets me use await inside this function

  try {
    const result = await checkNumber(-5); // wait for the Promise result
    console.log(result); // show success result
  } catch (error) {
    console.log(error); // show error if Promise is rejected
  }
};

runCheckNumber(); // start the function