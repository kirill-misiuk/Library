const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  author: { type: String },
  pageCount: { type: Number },
  year: Number,
}, {
  versionKey: false,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
