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

  return "";
};