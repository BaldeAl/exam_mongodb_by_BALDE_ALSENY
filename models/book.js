const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author:String,
  genre:String,
  description:String,
  image:String,
  publishedDate: Date,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;