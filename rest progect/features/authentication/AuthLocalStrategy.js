const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class AuthLocalStrategy {
  constructor(authRepository, authHash, authSerializer) {
    this.authRepository = authRepository;
    this.authHash = authHash;
    authSerializer.initialize();
  }

  initialize() {
    passport.use('local-signin', new LocalStrategy(this.localSignIn.bind(this)));
  }

  localSignIn(username, password, done) {
    return this.authRepository.findOne({ username })
      .toPromise()
      .then((res) => {
        if (res && this.authHash.validPassword(password, res.password)) {
          return done(null, res);
        }
        return done('incorrect username or password', false);
      });
  }
}
module.exports = AuthLocalStrategy;
