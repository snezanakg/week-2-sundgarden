import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my recipe API!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



//recipes

app.get("/recipes", (req, res) => {
  res.json({
    title: "My Recipe API"
  });
});

import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my recipe API!");
});

app.get("/recipes", (req, res) => {
  res.json({
    title: "My Recipe API"
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});