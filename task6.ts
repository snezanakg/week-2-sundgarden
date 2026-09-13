// Task 6 - Two Fetches in a Row

type AdviceData = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdvice = async (): Promise<string> => {
  // this function will return one advice as a string

   const response = await fetch("https://api.adviceslip.com/advice");
  // wait for the API response 

  const data: AdviceData = await response.json();
  // change the response into JSON
  return data.slip.advice; //return advice text
};


const runTwoFetches = async (): Promise<void> => {
  // get the first advice

  const firstAdvice = await fetchAdvice();
  console.log("First advice:", firstAdvice);
  // get the second advice after the first one is finished

  const secondAdvice = await fetchAdvice();
    console.log("Second advice:", secondAdvice);
};