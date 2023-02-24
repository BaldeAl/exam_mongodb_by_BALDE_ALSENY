const express = require('express');
const router = express.Router();
const booksRouter = require('./books');

router.get('/', (req, res) => {
  res.redirect('/books');
});

router.use('/books', booksRouter);

module.exports = router;