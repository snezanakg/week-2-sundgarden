import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

// Task 1 - List all parties

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});