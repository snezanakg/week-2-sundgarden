import express from "express";

const app = express();
const port = 3000;

// Task 1 - Homepage route
app.get("/", (req, res) => {
  res.send("Welcome to my recipe API!");
});

app.get("/recipes", (req, res) => {
  res.json({
    title: "My Recipe API",
    breakfast: [
      "Pancakes",
      "Omelette",
      "Yogurt with fruit"
    ],
    lunch: [
      "Chicken salad",
      "Pasta",
      "Vegetable soup"
    ],
      desserts: [
      "Chocolate cake",
      "Fruit salad",
      "Ice cream"
    ],
     lastUpdated: "2026-09-15"
  });
});

// Task 4 - Second JSON route
app.get("/about", (req, res) => {
  res.json({
    title: "About My Recipe API",
    description: "A simple API with recipe ideas",
    founded: 2026,
    funFact: "I enjoy working with food and recipes"
  });
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});