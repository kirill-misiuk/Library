
const passport = require('passport');

class AuthController {
  constructor(AuthService) {
    AuthService.initialize();
  }

  signIn(req, res, next) {
    const callback = (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('unauthorised'));
      }
      if (user) {
        req.login(user, (e) => {
          if (e) {
            return next(e);
          }
          res.status(200).json(req.user);
          return next();
        });
      }
      return next();
    };
    passport.authenticate('local-signIn', { session: true }, callback)(req, res, next);
  }

  signUp(req, res, next) {
    const callback = (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('unauthorised'));
      }
      if (user) {
        req.login(user, (e) => {
          if (e) {
            return next(e);
          }
          res.status(200).json(req.user);
          return next();
        });
      }
      return next();
    };
    passport.authenticate('local-signUp', { session: true }, callback)(req, res, next);
  }

  logout(req, res) {
    if (!req.isAuthenticated()) {
      throw new Error('unauthorised');
    } else {
      req.logout();
      res.redirect('/user');
    }
  }
}
module.exports = AuthController;
