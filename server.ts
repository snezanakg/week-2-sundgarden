import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

type Party = {
  id: number;
  name: string;
  leader: string;
  seats: number;
};

// Task 1 - List all parties

const parties: Party[] = [
  {
    id: 1,
    name: "Green Future Party",
    leader: "Anna Svensson",
    seats: 25
  },
  {
    id: 2,
    name: "People First",
    leader: "Erik Andersson",
    seats: 40
  },
  {
    id: 3,
    name: "Progress Party",
    leader: "Sara Nilsson",
    seats: 30
  }
];

app.get("/parties", (req, res) => {
  res.json(parties);
});


// Task 2 - Add a new party
app.post("/parties", (req, res) => {
     const { name, leader, seats } = req.body;
      const newParty: Party = {
    id: parties.length + 1,
    name,
    leader,
    seats
  };
 parties.push(newParty);

 res.status(201).json(newParty);
});
type PartyParams = {
  id: string;
};

// Task 4 - Update a party
app.put("/parties/:id", (req, res) => {
  const id = Number(req.params.id);
  const party = parties.find((party) => party.id === id);

   if (!party) {
    return res.status(404).json({
      message: "Party not found"
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});