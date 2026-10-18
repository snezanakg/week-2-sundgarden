

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    genre: {
      type: String,
      enum: [
        "fantasy",
        "dystopian",
        "children",
        "classic",
        "science fiction",
      ],
    },

    publishedYear: {
      type: Number,
      min: 1450,
      max: new Date().getFullYear(),
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
