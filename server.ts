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
    ]
      desserts: [
      "Chocolate cake",
      "Fruit salad",
      "Ice cream"
    ]
  });
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});