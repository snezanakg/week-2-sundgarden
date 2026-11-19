
# Week 12 - Building My First AI Agent with n8n


## Exercise 1 - Agent or Automation?

| # | Type | Explanation |
|---|---|---|
| 1 | Automation | The task runs every Monday at 08:00 and always follows the same steps to export and email the users. |
| 2 | Agent | The assistant needs to understand the customer's question, find the correct order, check the policy, and decide how to answer. |
| 3 | Automation | Even though ChatGPT creates the summary, the steps are fixed and happen in the same order every night. |
| 4 | Automation | Every new GitHub issue triggers the same action: sending a message to Slack. |
| 5 | Agent | The assistant checks different information and decides whether studying at home or going to the library is better. |
| 6 | Automation | Submitting the contact form always triggers the same actions: save the data and send a thank-you email. |

### Why is scenario 3 not an agent?

Scenario 3 uses AI to summarize forum posts, but it is still
an automation because the workflow is already decided.

Just like the Reddit summary example in the video,
the system collects posts, asks AI to summarize them,
and sends the result by email.

The AI writes the summary, but it doesn't choose
which steps to perform.

### Why is automation sometimes better than an agent?

Automation is often cheaper, faster, and easier to test.

If a task always follows the same steps, we don't need
an AI agent to make decisions. An automation is more
predictable and usually easier to maintain.


## Exercise 2 - Brain and Memory

### Question 1: What happened when the context window was 1, and when there was no memory? Explain what the context window length means.

I first tested my AI agent with Simple Memory set to 5.
The agent remembered information from our conversation.

Then I changed the context window length to 1. I told
the agent that my favorite fruit was mango, that I enjoy
cooking, and that my favorite season is summer.

When I asked about my favorite fruit, the agent still
answered mango. I noticed that the agent had also
mentioned mango in its recent replies, so the information
was still available in the conversation.

After removing Simple Memory, I asked the agent my name.
This time, it said it didn't know.

The context window length controls how many previous
interactions are passed to the AI model. A smaller window
gives the agent less conversation history to work with.

### Question 2: Why not set the context window to 1000?

A very large context window means the AI model may need
to process much more conversation history.

This can make requests slower, use more tokens, and
increase API costs. There are also limits to how much
text an AI model can process.

For my simple agent, a context window of 5 is enough
for the assignment.
## Exercise 3 - Your First Tool

### Question 1: Which questions made the agent use the weather tool, and which didn't? How did it decide?

When I first asked if I needed an umbrella, the agent asked where I was located instead of using the weather tool.

After I told it I was in Gothenburg, Sweden, it used **Get weather** and gave me an answer based on the weather data.

When I asked if I needed a jacket tonight, it also used the weather tool.

When I asked what 12 times 7 is, it answered **84** without using the weather tool.

The agent decided which tool to use based on my question. It used weather information when relevant but didn't need it for a maths question.

### Question 2: What is the difference between an agent and an automation?

An automation follows the same predefined steps every time.

My AI agent worked differently. In the execution logs, I could see that it called the weather tool for weather-related questions but not for the maths question.

This showed me that the agent could choose which action was needed instead of following a fixed sequence.

### Question 3: What would change if OpenWeatherMap offered an MCP server? Name one advantage.

If OpenWeatherMap offered an MCP server, the agent could connect to its tools using the standard MCP protocol.

One advantage is that different AI applications could discover and use the same tools without needing a separate custom integration for each application.

## Exercise 4 - Build Your Own Tool with an HTTP Request

### Question 1: Explain API, HTTP request, and function in your own words. Use the vending machine example and an example from your Express API.

An **API** is a way for two applications to communicate. I think of it like a vending machine that offers different things we can choose from.

An **HTTP request** is like pressing a button on the vending machine to ask for something. The machine receives the request and gives a response.

A **function** is the code that performs a specific task. In the vending machine example, it could be the mechanism that selects and delivers the drink.

In my Express API, I used routes such as `GET /books`. When a client sends a GET request to that endpoint, the server runs code to retrieve the books and returns the result as JSON.

For this exercise, I used an HTTP GET request to retrieve air-quality data from Open-Meteo.

### Question 2: What happened when you changed the tool description to something vague, like "tool"?

I first gave my Get air quality tool a clear description explaining what it does and when the agent should use it.

Then I changed the description to just `tool` and tested the agent again.

Surprisingly, my agent still used both Get weather and Get air quality. The workflow completed successfully and gave me advice about running outside.

In my test, the answer did not change dramatically.

However, I understand that clear descriptions are important because they help the AI decide which tool to use. A vague description could cause problems when the agent has more tools or receives different questions.

After testing, I changed the description back to the original one.

## Exercise 5 - Write a Real Prompt

### Question 1: Compare the bad prompt and the structured prompt. Give two concrete differences.

I first tested my agent with the simple system message "Help the user."

Surprisingly, it still gave useful answers about running, cycling and walking outside.

After adding a structured prompt, I noticed two differences:

1. **The answers were better organized.** The agent followed the same structure: weather, air quality, recommendation, and what to wear or bring.
2. **The advice was more focused.** The agent explained possible risks, such as cold temperatures and slippery roads, and gave practical clothing suggestions.

I also noticed that the agent sometimes reused previous weather information instead of calling the tools again, even with the improved prompt.

### Question 2: Which of the six parts made the biggest difference, and why?

I think the Output part made the biggest difference because it told the agent exactly how to organize its answers.

The Tools and Constraints sections were also useful because they explained when to check weather data and why the agent shouldn't invent information.

### Question 3: Why would skills be better than one huge prompt?

A system prompt is sent to the model with every message, but a skill can be loaded only when the agent needs it.

If an agent had ten different jobs, putting all the instructions into one huge prompt would make it harder to maintain and could waste tokens.

With skills, each job can have its own instructions, and the agent only loads the relevant ones when needed.