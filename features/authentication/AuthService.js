const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { from,of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

class AuthService {
  constructor(AuthRepository) {
    this.authRepository = AuthRepository;
  }


  initialize() {
    passport.use(new LocalStrategy(this.localSignIn.bind(this)));
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
  }

  localSignIn(username, password, done) {
    return this.authRepository.findOne(username, password)
      .toPromise()
      .then((res) => {
        if (res) {
          return done(null, { username, password });
        }
        return done(null, false, { message: 'incorrect username or password' });
      });
  }

  serializeUser(user, done) {
    return done(null, user.username);
  }

  deserializeUser(user, done) {
    done(null, user);
  }
}
module.exports = AuthService;
