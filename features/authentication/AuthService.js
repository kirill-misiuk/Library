const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { bindCallback, of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

class AuthService {
  constructor(AuthRepository) {
    this.authRepository = AuthRepository;
    this.authRepository.connect();
  }


  initialize() {
    passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    }, this.localSignIn.bind(this)));
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
  }

  localSignIn(req, username, password, done) {
    return this.authRepository.isValid(username, password)
      .pipe(mergeMap((res) => {
        if (res) {
          req.logIn({ username, password }, () => {});
          return of({ username, password });
        }
        return of(false, { message: 'Incorrect username or password.' });
      })).toPromise().then((result) => done(null, result));
  }

  serializeUser(user, done) {
    return done(null, user.username);
  }

  deserializeUser(user, done) {
    done(null, user);
  }
}
module.exports = AuthService;
