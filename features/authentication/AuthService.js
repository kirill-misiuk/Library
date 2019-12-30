const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { bindCallback ,of} = require('rxjs');
const { mergeMap,  } = require('rxjs/operators');

class AuthService {
  constructor(AuthRepository) {
    this.authRepository = AuthRepository;
    this.authRepository.connect();
  }


  initialize() {
    passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback:true},this.localSignIn.bind(this)));
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
  }

  localSignIn(req,username, password, done) {
    this.authRepository.isValid(username, password)
      .pipe(mergeMap((res) => {
        console.log(res);
        if (res) {
          req.logIn(username, () => {
            req.session.save();
          });
          return of({ username, password });
        }
        return of({ message: 'Incorrect username or password.' });
      })).subscribe((res) => done(null, res));
  }

  serializeUser(user, done) {
    return done(null, user.username);
  }

  deserializeUser(user, done) {
    done(null, user);
  }
}
module.exports = AuthService;
