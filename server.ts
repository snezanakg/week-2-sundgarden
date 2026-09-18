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

  const { name, leader, seats } = req.body;

  party.name = name;
  party.leader = leader;
  party.seats = seats;

   res.json(party);
});

// Task 5 - Remove a party
app.delete("/parties/:id", (req, res) => {
  const id = Number(req.params.id);

   const partyIndex = parties.findIndex((party) => party.id === id);

        if (partyIndex === -1) {
    return res.status(404).json({
      message: "Party not found"
    });
  }
    const deletedParty = parties.splice(partyIndex, 1);

    res.json(deletedParty[0]);
});



//  Task 6 - Add a new party and handle bad input
app.post("/parties", (req, res) => {
  const { name, leader, seats } = req.body;

  if (!name || !leader) {
    return res.status(400).json({
      message: "Name and leader are required"
    });
  }

  const newParty: Party = {
    id: parties.length + 1,
    name,
    leader,
    seats
  };

  parties.push(newParty);

  res.status(201).json(newParty);
});







app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});