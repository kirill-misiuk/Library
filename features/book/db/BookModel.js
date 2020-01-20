const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String },
  author: { type: String },
  pageCount: { type: Number },
  year: { type: Number },
}, {
  versionKey: false,
});
bookSchema.index({ name: 1, author: 1, year: 1 }, { unique: true });
const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
