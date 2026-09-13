// Task 5 - Checking the Response

type AdviceData = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdvice = async (): Promise<void> => {
  // this function will fetch advice and check the response
};


  const response = await fetch("https://api.adviceslip.com/advice");
  // wait for the API response
};