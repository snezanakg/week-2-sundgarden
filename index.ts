import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Library API" });
});
// GET all books with optional filtering and sorting
app.get("/books", async (req, res) => {
  try {
    const { genre, sort } = req.query;

    const allowedSorts = ["title", "published_year", "genre"];

    if (sort && !allowedSorts.includes(String(sort))) {
      res.status(400).json({ message: "Invalid sort value" });
      return;
    }

    const values: string[] = [];
    let query = "SELECT * FROM books";

    if (genre) {
      values.push(String(genre));
      query += ` WHERE genre = $${values.length}`;
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
    } else {
      query += " ORDER BY id";
    }

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET one book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }

    const result = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new book
app.post("/books", async (req, res) => {
  try {
    const { title, genre, published_year } = req.body;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const result = await pool.query(
      `INSERT INTO books (title, genre, published_year)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, genre, published_year]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, published_year } = req.body;

    const result = await pool.query(
      `UPDATE books
       SET title = $1,
           genre = $2,
           published_year = $3
       WHERE id = $4
       RETURNING *`,
      [title, genre, published_year, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});