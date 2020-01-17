const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

class AuthService {
  constructor(AuthRepository, AuthHash) {
    this.authRepository = AuthRepository;
    this.authHash = AuthHash;
  }


  initialize() {
    passport.use('local-signin', new LocalStrategy(this.localSignIn.bind(this)));
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser.bind(this));
    passport.use('local-signup', new LocalStrategy(this.localSignUp.bind(this)));
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

  localSignUp(username, password, done) {
    return this.authRepository.findOne({ username })
      .pipe(mergeMap((res) => {
        if (res) {
          return of(null);
        }
        return this.authRepository.create({ username, password: this.authHash.generateHash(password) });
      }))
      .toPromise()
      .then((newUser) => {
        if (newUser) {
          return done(null, newUser);
        }
        return done('this username is exists', false);
      });
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
module.exports = AuthService;
