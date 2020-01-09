const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  pageCount: Number,
  year: Number,
}, {
  versionKey: false,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
