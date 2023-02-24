/* const Book = require('../models/book');

exports.index = async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
};

exports.new = (req, res) => {
  res.render('add');
};

exports.create = async (req, res) => {
  const { title, author,genre, description, publishedDate } = req.body;
  const image = req.file.filename;
  const book = new Book({ title, author, genre, description, image, publishedDate });
  await book.save();
  res.redirect('/');
};

exports.edit = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
};

exports.update = async (req, res) => {
  const { title, author,genre, description, publishedDate } = req.body;
  const image = req.file ? req.file.filename : undefined;
  const updateData = { title, author,genre, description, publishedDate };
  if (image) {
    updateData.image = image;
  }
  await Book.findByIdAndUpdate(req.params.id, updateData);
  res.redirect('/');
};

exports.delete = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

exports.show = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('show', { book });
};
 */
const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render('index', { books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getNewBookForm = (req, res) => {
  res.render('add');
};

exports.createBook = async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      genre:req.body.genre,
      description: req.body.description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      publishedDate: req.body.publishedDate
    });
    await book.save();
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('show', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditBookForm = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('edit', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    genre:req.body.genre;
    book.description = req.body.description;
    if (req.file) {
      book.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    publishedDate: req.body.publishedDate;
    await book.save();
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
