


import "dotenv/config";
import express from "express";
import { connectDB } from "./db.js";
import Book from "./models/Book.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Library API!",
  });
});

// GET all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();

    res.status(201).json(savedBook);
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});

// Connect to MongoDB
await connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
