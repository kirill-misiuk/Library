
const mongoose = require('mongoose');
const { from } = require('rxjs');
const { User } = require('./AuthModels');

class AuthRepository {
  constructor() {
    this.url = process.env.MONGO_URL;
    this.database = process.env.MONGO_DATABASE;
  }

  connect() {
    console.log('Database connecting...');
    const _this = this;
    mongoose.connect(`${this.url}/${this.database}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(
      (db) => {
        _this.mongodb = db;
      }, (error) => {
        console.log('!', error);
      },
    );
  }

  isValid(user, password) {
    return from(User.findOne({ username: user, password }).then(
      (item) => {
        const valid = (item !== null);
        return valid;
      }, (error) => error,
    ));
  }
}
module.exports = AuthRepository;
