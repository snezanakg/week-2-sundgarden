
// Task 4 - Fetching Advice

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

  const data: AdviceData = await response.json();
  // change the response into JSON and save it as AdviceData

  console.log(data.slip.advice);
  // show only the advice text
} catch (error) {
    console.log("Something went wrong");
  }




fetchAdvice(); // start the async function