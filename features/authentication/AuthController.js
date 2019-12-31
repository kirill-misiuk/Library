
const passport = require('passport');

class AuthController {
  constructor(AuthService) {
    AuthService.initialize();
  }

  signIn(req, res, next) {
    const callback = (err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        req.logIn(user, (e) => {
          if (e) {
            return next(e);
          }
          res.status(200).json(req.user);
          return next();
        });
      }
      return next();
    };
    passport.authenticate('local', { session: true }, callback)(req, res, next);
  }
}
module.exports = AuthController;
