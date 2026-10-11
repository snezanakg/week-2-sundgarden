
import express from "express";
import { z } from "zod";
import { env } from "./env.js";
import { pool } from "./db.js";
import {
  bookSchema,
  bookPatchSchema,
  bookQuerySchema,
  idParamSchema,
  type Book,
} from "./schemas.js";




const app = express();

app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Library API" });
});
// GET all books with optional filtering and sorting
app.get("/books", async (req, res) => {
  try {
    const validation = bookQuerySchema.safeParse(req.query);

    if (!validation.success) {
      res.status(400).json({
        errors: z.flattenError(validation.error),
      });
      return;
    }

    const { genre, sort } = validation.data;

    const values: string[] = [];
    let query = "SELECT * FROM books";

    if (genre) {
      values.push(genre);
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
    const validation = idParamSchema.safeParse(req.params);

    if (!validation.success) {
      res.status(400).json({
        errors: z.flattenError(validation.error),
      });
      return;
    }

    const { id } = validation.data;

    const result = await pool.query<Book>(
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
    const validation = bookSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        errors: z.flattenError(validation.error),
      });
      return;
    }

    const { title, genre, published_year, author_id } = validation.data;

    const result = await pool.query<Book>(
      `INSERT INTO books (title, genre, published_year, author_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, genre, published_year, author_id ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23503"
    ) {
      res.status(400).json({ message: "Author does not exist" });
      return;
    }

    res.status(500).json({ message: "Server error" });
  }
});
// PUT update a book

app.put("/books/:id", async (req, res) => {
  try {
    const idValidation = idParamSchema.safeParse(req.params);

    if (!idValidation.success) {
      res.status(400).json({
        errors: z.flattenError(idValidation.error),
      });
      return;
    }

    const { id } = idValidation.data;

    const validation = bookSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        errors: z.flattenError(validation.error),
      });
      return;
    }

    const { title, genre, published_year, author_id } = validation.data;

    const result = await pool.query<Book>(
      `UPDATE books
       SET title = $1,
           genre = $2,
           published_year = $3,
           author_id = $4
       WHERE id = $5
       RETURNING *`,
      [title, genre, published_year, author_id ?? null, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// PATCH partially update a book

app.patch("/books/:id", async (req, res) => {
  try {
    const idValidation = idParamSchema.safeParse(req.params);

    if (!idValidation.success) {
      res.status(400).json({
        errors: z.flattenError(idValidation.error),
      });
      return;
    }

    const { id } = idValidation.data;

    const validation = bookPatchSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        errors: z.flattenError(validation.error),
      });
      return;
    }

    const { title, genre, published_year, author_id } = validation.data;

    const result = await pool.query<Book>(
      `UPDATE books
       SET title = COALESCE($1, title),
           genre = COALESCE($2, genre),
           published_year = COALESCE($3, published_year),
           author_id = COALESCE($4, author_id)
       WHERE id = $5
       RETURNING *`,
      [
        title ?? null,
        genre ?? null,
        published_year ?? null,
        author_id ?? null,
        id,
      ]
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
// DELETE a book
app.delete("/books/:id", async (req, res) => {
  try {
    const idValidation = idParamSchema.safeParse(req.params);

    if (!idValidation.success) {
      res.status(400).json({
        errors: z.flattenError(idValidation.error),
      });
      return;
    }

    const { id } = idValidation.data;
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
// GET all authors
app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// POST a new author
app.post("/authors", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Author name is required" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all books by one author using a JOIN
app.get("/authors/:id/books", async (req, res) => {
  try {
    const idValidation = idParamSchema.safeParse(req.params);

    if (!idValidation.success) {
      res.status(400).json({
        errors: z.flattenError(idValidation.error),
      });
      return;
    }

    const { id } = idValidation.data;

    const result = await pool.query(
      `SELECT
         b.id,
         b.title,
         b.genre,
         b.published_year,
         b.author_id,
         a.name AS author_name
       FROM authors a
       JOIN books b
       ON a.id = b.author_id
       WHERE a.id = $1
       ORDER BY b.id`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});