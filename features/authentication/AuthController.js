const passport = require('passport');
const authError = require('passport/lib/errors/authenticationerror');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  signIn(req, res, next) {
    const callback = (err, user) => {
      if (err) {
        return authError(err, 403);
      }
      if (!user) {
        return authError();
      }
      if (user) {
        req.login(user, (e) => {
          if (e) {
            return next(new Error(e));
          }
          return res.status(200).json({ status: res.statusCode });
        });
      }
      return next();
    };
    passport.authenticate('local-signin', { session: true }, callback)(req, res, next);
  }

  signUp(req, res) {
    const user = req.body;
    this.authService.signUp(user).subscribe({
      next: (data) => data && res.status(200).json({ status: 200, message: 'successful' }) || res.status(400).json({ status: 400, message: 'username is exists' }),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  logout(req, res) {
    req.logout();
    res.redirect('/auth/user');
  }
}
module.exports = AuthController;
