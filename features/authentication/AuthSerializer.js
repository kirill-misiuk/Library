const passport = require('passport');

class AuthSerializer {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  initialize() {
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser.bind(this));
  }

  serializeUser(user, done) {
    return done(null, { id: user._id, username: user.username });
  }


  deserializeUser(user, done) {
    return this.authRepository.findOne({ _id: user.id })
      .toPromise()
      .then((res) => {
        if (res) {
          return done(null, res);
        }
        return done('problem in deserialize', false);
      })
      .catch((e) => done(e));
  }
}
module.exports = AuthSerializer;
