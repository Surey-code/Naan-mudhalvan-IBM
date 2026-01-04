const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory movie array
let movies = [];
let idCounter = 1;

// ===== CREATE MOVIE =====
app.post("/movies", (req, res) => {
    const { title, genre, year } = req.body;
    if (!title || !genre || !year) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const movie = { id: idCounter++, title, genre, year };
    movies.push(movie);
    res.status(201).json(movie);
});

// ===== READ ALL MOVIES =====
app.get("/movies", (req, res) => {
    res.json(movies);
});

// ===== READ MOVIE BY ID =====
app.get("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
});

// ===== UPDATE MOVIE =====
app.put("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const { title, genre, year } = req.body;
    if (title) movie.title = title;
    if (genre) movie.genre = genre;
    if (year) movie.year = year;

    res.json(movie);
});

// ===== DELETE MOVIE =====
app.delete("/movies/:id", (req, res) => {
    const index = movies.findIndex(m => m.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: "Movie not found" });

    movies.splice(index, 1);
    res.json({ message: "Movie deleted successfully" });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
