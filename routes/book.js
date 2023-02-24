/* const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Index
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
});

// Nouveau
router.get('/new', (req, res) => {
  res.render('add');
});

// Creer un livre
router.post('/', async (req, res) => {
  const { title, author,genre, description, publishedDate } = req.body;
  const book = new Book({ title, author,genre, description,publishedDate });
  await book.save();
  res.redirect('/');
});

// editer
router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

// mettre à jour
router.put('/:id', async (req, res) => {
  const { title, author,genre, description, publishedDate } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author,genre, description, publishedDate });
  res.redirect('/');
});

// Supprimer
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// aafficher
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('show', { book });
});

module.exports = router; */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controllers/book');

const upload = multer({ dest: 'public/images/' });

// GET all books
router.get('/', bookController.getAllBooks);

// GET new book form
router.get('/new', bookController.getNewBookForm);

// POST new book
router.post('/', upload.single('image'), bookController.createBook);

// GET book by ID
router.get('/:id', bookController.getBookById);

// GET edit book form
router.get('/:id/edit', bookController.getEditBookForm);

// PUT update book
router.put('/:id', upload.single('image'), bookController.updateBook);

// DELETE delete book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
