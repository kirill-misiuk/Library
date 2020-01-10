const mongoose = require('mongoose');
const { from } = require('rxjs');
const { User } = require('./AuthModels');

class AuthRepository {
  constructor() {
    this.url = process.env.MONGO_URL;
    this.database = process.env.MONGO_DATABASE;
    mongoose.connect(`${this.url}/${this.database}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .catch((e) => console.log('problem with connection ', e));
  }


  findOne(username) {
    return from(User.findOne({ username }));
  }

  create(user) {
    return from(User.create(user));
  }
}
module.exports = AuthRepository;