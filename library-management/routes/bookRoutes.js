const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* READ ALL */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* READ BY CATEGORY */
router.get("/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
});

/* READ AFTER 2015 */
router.get("/after/2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});

/* UPDATE COPIES */
router.put("/:id/copies", async (req, res) => {
  const { change } = req.body;
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.availableCopies + change < 0)
    return res.status(400).json({ error: "Negative stock not allowed" });

  book.availableCopies += change;
  await book.save();
  res.json(book);
});

/* UPDATE CATEGORY */
router.put("/:id/category", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category: req.body.category },
    { new: true }
  );

  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

/* DELETE IF COPIES = 0 */
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.availableCopies !== 0)
    return res.status(400).json({ error: "Cannot delete book with copies" });

  await book.deleteOne();
  res.json({ message: "Book removed" });
});

module.exports = router;
