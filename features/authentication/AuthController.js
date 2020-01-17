
const passport = require('passport');

class AuthController {
  constructor(AuthService) {
    AuthService.initialize();
  }

  sign(req, res, next) {
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
    passport.authenticate(`${req.query.strategy}`, { session: true }, callback)(req, res, next);
  }

  logout(req, res) {
    req.logout();
    res.redirect('/auth/user');
  }
}
module.exports = AuthController;
