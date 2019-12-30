
const passport = require('passport');

class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
    AuthService.initialize();
  }

  signIn(req, res, next) {
    function callback(err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.logIn(user, (e) => {
          if (e) {
            return next(e);
          }
          console.log(req.session);
          res.status(200).json(req.user);
          return next();
        });
      }
    }
    passport.authenticate('local', { session: true }, callback)(req, res, next);
  }
}
module.exports = AuthController;
