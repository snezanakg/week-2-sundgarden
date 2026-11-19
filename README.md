# Week 12 – My First AI Agent with n8n

## About the project

For this assignment, I built my first AI agent using n8n.

I created an Outdoor Activity Assistant that checks the weather and air quality in Gothenburg and helps decide whether it's a good day for walking, running, or cycling.

The agent uses Google Gemini, Simple Memory, OpenWeatherMap, and the Open-Meteo API.

## What I did

- Built and tested an AI agent with memory and tools.
- Compared a simple prompt with a structured prompt.
- Created a morning outdoor briefing scheduled for 07:00.
- Tested different errors and learned how to troubleshoot them using n8n execution logs.

## Running the project

Start Docker Desktop, then run:

`docker compose up -d`

Open `http://localhost:5678` to access n8n.

The exported workflows are in the `workflows` folder. API credentials must be configured separately.

## Project files

- `ANSWERS.md` – My answers and observations.
- `prompt.md` – The final structured prompt.
- `workflows/` – Exported n8n workflows.
- `screenshots/` – Screenshots from my tests.
- `compose.yml` – Docker configuration.

## What I learned

This assignment helped me understand how AI agents use tools, remember conversations, and make decisions. I also learned that a successful workflow doesn't always mean the answer is correct, so checking the execution logs is important.

Author: Snezana Kragujevac