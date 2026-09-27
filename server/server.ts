import express from "express";
import { z } from "zod";

const app = express();
const port = 3000;

app.use(express.json());
const randomPersonSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
      location: z.object({
        country: z.string(),
      }),
    })
  ),
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/random-person", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const result = randomPersonSchema.safeParse(data);

    if (!result.success) {
      return res.status(500).json({
        error: "Invalid data received from Random User API",
      });
    }

    const person = result.data.results[0];

    return res.status(200).json({
      fullName: `${person.name.first} ${person.name.last}`,
      country: person.location.country,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch random person",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});