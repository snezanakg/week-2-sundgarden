// Task 1 - Coin Flip

const flipCoin = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outcome = Math.random() > 0.5;

    if (outcome) {
      resolve("You win!");
    } else {
      reject("You lose!");
    }
  });
};

const runCoinFlip = (): void => {
  try {
    const result = await flipCoin();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

runCoinFlip();