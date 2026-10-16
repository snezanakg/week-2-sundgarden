
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
