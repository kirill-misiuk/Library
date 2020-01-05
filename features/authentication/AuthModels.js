const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { auto: true, type: mongoose.Schema.Types.ObjectId },
  username: String,
  password: String,
}, {
  versionKey: false,
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
