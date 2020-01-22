
const passport = require('passport');

class AuthController {
  constructor(AuthService, AuthLocalStrategy) {
    this.authService = AuthService;
    AuthLocalStrategy.initialize();
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
      next: (data) => data && res.status(200).json({ status: 200, data }) || res.status(400).json({ status: 400, message: 'username is exists' }),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  logout(req, res) {
    req.logout();
    res.redirect('/auth/user');
  }
}
module.exports = AuthController;
