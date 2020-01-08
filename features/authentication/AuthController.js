
const passport = require('passport');

class AuthController {
  constructor(AuthService) {
    AuthService.initialize();
  }

  signIn(req, res, next) {
    const callback = (err, user) => {
      if (err) {
        return res.status(403).json({ status: res.statusCode, message: err });
      }
      if (!user) {
        return res.status(401).json({ status: res.statusCode, message: 'unauthorised' });
      }
      if (user) {
        req.login(user, (e) => {
          if (e) {
            return next(new Error(e));
          }
          return res.status(200).json(req.user);
        });
      }
      return next();
    };
    passport.authenticate('local-signIn', { session: true }, callback)(req, res, next);
  }

  signUp(req, res, next) {
    const callback = (err, user) => {
      if (err) {
        return res.status(403).json({ status: res.statusCode, message: err });
      }
      if (!user) {
        return res.status(401).json({ status: res.statusCode, message: 'unauthorised' });
      }
      if (user) {
        req.login(user, (e) => {
          if (e) {
            return next(new Error(e));
          }
          return res.status(200).json(req.user);
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
      res.redirect('/auth/user');
    }
  }
}
module.exports = AuthController;
