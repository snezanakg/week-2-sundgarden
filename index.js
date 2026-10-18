


import "dotenv/config";
import express from "express";
import { connectDB } from "./db.js";
import Book from "./models/Book.js";
import Author from "./models/Author.js";

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
    const filter = {};

    if (req.query.genre) {
      filter.genre = req.query.genre;
    }

    const query = Book.find(filter);

    if (req.query.sort === "publishedYear") {
      query.sort({ publishedYear: -1 });
    }

    const books = await query.populate("author");
    res.json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


 // PUT - Update a book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.json(updatedBook);
  } catch (error) {
    if (error.name === "CastError" ||
        error.name === "ValidationError") {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});



 // DELETE - Remove a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid book ID",
      });
    }

    res.status(500).json({
      error: error.message,
    });
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


 // GET a single book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid book ID",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


 // GET - Retrieve all authors
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.post("/authors", async (req, res) => {
  try {
    const author = new Author(req.body);
    const savedAuthor = await author.save();

    res.status(201).json(savedAuthor);
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});



app.get("/authors/:id/books", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        error: "Author not found",
      });
    }

    const books = await Book.find({
      author: author._id,
    });

    res.json(books);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid author ID",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});


// Connect to MongoDB
await connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
