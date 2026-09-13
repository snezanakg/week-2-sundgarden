// Task 4 - Fetching Advice

type AdviceData = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdvice = async (): Promise<void> => {
  // this function will get advice from the API
};



type AdviceData = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdvice = async (): Promise<void> => {
  // this function gets advice from the API

  const response = await fetch("https://api.adviceslip.com/advice");
  // wait for the API response
};