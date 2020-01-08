const bcrypt = require('bcrypt');

class AuthHash {
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

  validPassword(lpw, password) {
    return bcrypt.compareSync(lpw, password);
  }
}
module.exports = AuthHash;
