const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let movies = [];
let idCounter = 1;

// CREATE
app.post("/movies", (req, res) => {
    const { title, genre, year } = req.body;
    if (!title || !genre || !year) {
        return res.status(400).json({ message: "All fields required" });
    }
    const movie = { id: idCounter++, title, genre, year };
    movies.push(movie);
    res.status(201).json(movie);
});

// READ ALL
app.get("/movies", (req, res) => res.json(movies));

// LISTEN must be last
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
