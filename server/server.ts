import express from "express";
import { z } from "zod";

const app = express();
const port = 3000;

app.use(express.json());

// Schema for data from Random User API
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

// Schema for random login data
const randomLoginSchema = z.object({
  results: z.array(
    z.object({
      login: z.object({
        username: z.string(),
        password: z.string(),
      }),
    })
  ),
});

// Schema for creating a user
const userSchema = z.object({
  name: z.string().min(3).max(12),
  age: z.number().min(18).max(100).default(28),
  email: z.string().email().toLowerCase(),
});

// Test route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Get a random person
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

    if (!person) {
      return res.status(500).json({
        error: "No person found",
      });
    }

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

// Create a user
app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  return res.status(201).json(result.data);
});

// Get random login details
app.get("/random-login", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const result = randomLoginSchema.safeParse(data);

    if (!result.success) {
      return res.status(500).json({
        error: "Invalid login data received from Random User API",
      });
    }

    const user = result.data.results[0];

    if (!user) {
      return res.status(500).json({
        error: "No login data found",
      });
    }

    return res.status(200).json({
      username: user.login.username,
      password: user.login.password,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch random login",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});