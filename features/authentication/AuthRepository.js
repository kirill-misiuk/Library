
const mongoose = require('mongoose');
const { from } = require('rxjs');
const { User } = require('./AuthModels');

class AuthRepository {
  constructor() {
    this.url = process.env.MONGO_URL;
    this.database = process.env.MONGO_DATABASE;
    mongoose.connect(`${this.url}/${this.database}`, { useNewUrlParser: true, useUnifiedTopology: true });
  }


  findOne(user, password) {
    return from(User.findOne({ username: user, password }));
  }
}
module.exports = AuthRepository;
