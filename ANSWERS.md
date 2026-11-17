
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
