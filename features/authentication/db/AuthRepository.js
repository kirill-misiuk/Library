const { from } = require('rxjs');
const { User } = require('./UserModel');

class AuthRepository {
  findOne(username) {
    return from(User.findOne(username).lean().exec());
  }

  create(user) {
    return from(User.create(user));
  }
}
module.exports = AuthRepository;
