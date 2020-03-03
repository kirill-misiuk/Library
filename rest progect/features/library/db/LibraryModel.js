const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  about: String,
  archive: Array,
}, {
  versionKey: false,
});

const Library = mongoose.model('Library', librarySchema);
module.exports = { Library };
