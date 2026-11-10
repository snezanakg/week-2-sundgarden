
import "./instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import dotenv from "dotenv";
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
  Sentry.captureException(error);
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
  Sentry.captureException(error);
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
    // Handle invalid author foreign key
    if (error instanceof ForeignKeyConstraintError) {
      res.status(400).json({
        message: "Author does not exist",
      });
      return;
    }

    // Send unexpected database errors to Sentry
    Sentry.captureException(error);
    console.error(error);

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
  Sentry.captureException(error);
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

});



 // PATCH - Partially update a book using Sequelize
app.patch("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, published_year } = req.body ?? {};

    // Validate book ID
    if (
      !/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))
    ) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }

    // Prepare only the fields provided
    const updates: {
      title?: string;
      genre?: string | null;
      published_year?: number | null;
    } = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        res.status(400).json({ message: "Invalid title" });
        return;
      }
      updates.title = title.trim();
    }

    if (genre !== undefined) {
      if (genre !== null && typeof genre !== "string") {
        res.status(400).json({ message: "Invalid genre" });
        return;
      }
      updates.genre = genre;
    }

    if (published_year !== undefined) {
      if (
        published_year !== null &&
        !Number.isInteger(published_year)
      ) {
        res.status(400).json({ message: "Invalid published year" });
        return;
      }
      updates.published_year = published_year;
    }

    // Reject empty or unsupported updates
    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        message: "Request body cannot be empty",
      });
      return;
    }

    // Find book using Sequelize
    const book = await Book.findByPk(Number(id));

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Update only the supplied fields
    await book.update(updates);

    res.status(200).json(book);

} catch (error) {
  Sentry.captureException(error);
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
  Sentry.captureException(error);
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

});





 // GET all authors using Sequelize
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json(authors);

} catch (error) {
  Sentry.captureException(error);
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

});



 // POST a new author using Sequelize
app.post("/authors", async (req, res) => {
  try {
    const { name } = req.body ?? {};

    // Validate author name
    if (typeof name !== "string" || !name.trim()) {
      res.status(400).json({
        message: "Author name is required",
      });
      return;
    }

    // Create author using Sequelize
    const author = await Author.create({
      name: name.trim(),
    });

    res.status(201).json(author);

} catch (error) {
  Sentry.captureException(error);
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
  Sentry.captureException(error);
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

});

 // POST - Borrow a book using Sequelize
app.post("/loans", async (req, res) => {
  try {
    const { member_id, book_id } = req.body ?? {};

    // Validate required IDs
    if (
      !Number.isSafeInteger(member_id) ||
      member_id <= 0 ||
      !Number.isSafeInteger(book_id) ||
      book_id <= 0
    ) {
      res.status(400).json({
        message: "Valid member_id and book_id are required",
      });
      return;
    }

    // Check if member exists
    const member = await Member.findByPk(member_id);

    if (!member) {
      res.status(404).json({
        message: "Member not found",
      });
      return;
    }

    // Check if book exists
    const book = await Book.findByPk(book_id);

    if (!book) {
      res.status(404).json({
        message: "Book not found",
      });
      return;
    }

    // Create a new loan
    const loan = await Loan.create({
      member_id,
      book_id,
    });

    res.status(201).json(loan);

} catch (error) {
  Sentry.captureException(error);
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

});

 // GET a member with their borrowed books using Sequelize
app.get("/members/:id/loans", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate member ID
    if (
      !/^[1-9]\d*$/.test(id) ||
      !Number.isSafeInteger(Number(id))
    ) {
      res.status(400).json({
        message: "Invalid member id",
      });
      return;
    }

    // Find member and include borrowed books
    const member = await Member.findByPk(Number(id), {
      include: [
        {
          model: Book,
          as: "borrowedBooks",
          through: {
            attributes: [
              "id",
              "loan_date",
              "returned_at",
            ],
          },
        },
      ],
    });

    // Check if member exists
    if (!member) {
      res.status(404).json({
        message: "Member not found",
      });
      return;
    }

    res.status(200).json(member);

} catch (error) {
  Sentry.captureException(error);
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

});


const PORT = process.env.PORT || 3000;

// Exercise 3 - Test incorrect middleware order
Sentry.setupExpressErrorHandler(app);

 // Exercise 2 - Test Sentry error reporting
if (process.env.NODE_ENV !== "production") {
  app.get("/debug-sentry", (_req, _res) => {
    throw new Error("My first Sentry error!");
  });
}


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});