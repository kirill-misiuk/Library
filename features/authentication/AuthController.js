
const passport = require('passport');

class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  initialize() {
    this.authService.initialize();
  }

  signIn(req, res, next) {
    passport.authenticate('local', { session: true })(req, res, next);
    console.log(req.user);
    res.status(200).json({ status: res.statusCode, user: req.user });
  }
}
module.exports = AuthController;
