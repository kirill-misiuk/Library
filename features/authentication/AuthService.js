const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { of, from } = require('rxjs');
const { map, mergeMap } = require('rxjs/operators');

class AuthService {
  constructor(AuthRepository) {
    this.passport = passport;
    this.authRepository = AuthRepository;
    this.authRepository.connect();
  }

  initialize() {
    this.passport.use(new LocalStrategy(this.localSignIn.bind(this)));
    // this.passport.use(new LocalStrategy(this.localSignUp.bind(this)));
    this.passport.serializeUser(this.serializeUser);
    this.passport.deserializeUser(this.deserializeUser);
  }

  localSignUp(username, password, done) {

  }

  localSignIn(username, password) {
    return this.authRepository.isValid(username, password).pipe(mergeMap((res) => {
      if (res) { return of({ username, password }); }
      return of({ message: 'Incorrect username or password.' });
    }));
  }

  serializeUser(user, done) {
    return done(null, user.username);
  }

  deserializeUser(user, done) {
    done(null, user);
  }
}
module.exports = AuthService;
