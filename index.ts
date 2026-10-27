import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";
import Book from "./models/Book.js";
import { ForeignKeyConstraintError } from "sequelize";
import Author from "./models/Author.js";
import Member from "./models/Member.js";
import Loan from "./models/Loan.js";
dotenv.config();

const app = express();

app.use(express.json());

 // One author can have many books
Author.hasMany(Book, {
  foreignKey: "author_id",
  as: "books",
});

// Each book belongs to one author
Book.belongsTo(Author, {
  foreignKey: "author_id",
  as: "author",
});
// Many-to-many: Members and Books through Loans
Member.belongsToMany(Book, {
  through: {
    model: Loan,
    unique: false,
  },
  foreignKey: "member_id",
  otherKey: "book_id",
  as: "borrowedBooks",
});

Book.belongsToMany(Member, {
  through: {
    model: Loan,
    unique: false,
  },
  foreignKey: "book_id",
  otherKey: "member_id",
  as: "borrowers",
});

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Library API" });
});

 // GET all books using Sequelize
app.get("/books", async (req, res) => {
  try {
    const { genre, sort } = req.query;

    const allowedSorts = [
      "title",
      "published_year",
      "genre",
    ];

    if (sort && !allowedSorts.includes(String(sort))) {
      res.status(400).json({ message: "Invalid sort value" });
      return;
    }

   
const books = await Book.findAll({
  ...(genre
    ? { where: { genre: String(genre) } }
    : {}),

  include: [
    {
      model: Author,
      as: "author",
      attributes: ["name"],
      required: false,
    },
  ],

  order: [[sort ? String(sort) : "id", "ASC"]],
});

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



 // GET one book by ID using Sequelize
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the book ID
    if (
      !/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))
    ) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }

    // Find the book using Sequelize
    const book = await Book.findByPk(Number(id));

    // Return 404 if the book doesn't exist
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Return the book as JSON
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


 // POST a new book using Sequelize
app.post("/books", async (req, res) => {
  try {
    const {
      title,
      genre,
      published_year,
      author_id,
    } = req.body ?? {};

    // Validate required title
    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    // Create book using Sequelize
    const book = await Book.create({
      title,
      genre: genre ?? null,
      published_year: published_year ?? null,
      author_id: author_id ?? null,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(error);

    // Handle invalid author foreign key
    if (error instanceof ForeignKeyConstraintError) {
      res.status(400).json({
        message: "Author does not exist",
      });
      return;
    }

    res.status(500).json({ message: "Server error" });
  }
});


 
 // PUT update a book using Sequelize
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, published_year } = req.body ?? {};

    // Validate the book ID
    if (
      !/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))
    ) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }

    // Validate required title
    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    // Find existing book
    const book = await Book.findByPk(Number(id));

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Update using Sequelize
    await book.update({
      title,
      genre: genre ?? null,
      published_year: published_year ?? null,
    });

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// PATCH partially update a book
app.patch("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }

    const { title, genre, published_year } = req.body ?? {};

    if (
      title === undefined &&
      genre === undefined &&
      published_year === undefined
    ) {
      res.status(400).json({ message: "Request body cannot be empty" });
      return;
    }

    const result = await pool.query(
      `UPDATE books
       SET title = COALESCE($1, title),
           genre = COALESCE($2, genre),
           published_year = COALESCE($3, published_year)
       WHERE id = $4
       RETURNING *`,
      [title ?? null, genre ?? null, published_year ?? null, id]
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

 // DELETE a book using Sequelize
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate book ID
    if (
      !/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))
    ) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }

    // Find book using Sequelize
    const book = await Book.findByPk(Number(id));

    // Check if book exists
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Delete book using Sequelize
    await book.destroy();

    res.status(200).json(book);
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


 // GET an author with their books using Sequelize
app.get("/authors/:id/books", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate author ID
    if (
      !/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))
    ) {
      res.status(400).json({ message: "Invalid author id" });
      return;
    }

    // Find author and include their books
    const author = await Author.findByPk(Number(id), {
      include: [
        {
          model: Book,
          as: "books",
        },
      ],
    });

    // Check if author exists
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});