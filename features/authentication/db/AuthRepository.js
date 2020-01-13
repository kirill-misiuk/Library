const { from } = require('rxjs');
const { User } = require('./AuthModels');

class AuthRepository {
  findOne(username) {
    return from(User.findOne(username));
  }

  create(user) {
    return from(User.create(user));
  }
}
module.exports = AuthRepository;
