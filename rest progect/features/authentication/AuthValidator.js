const { validationResult } = require('express-validator');

class AuthValidator {
  sign(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ status: res.statusCode, errors: result.array() });
    }
    next();
  }

  mustAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(403).json({ status: res.statusCode, message: 'Forbidden' });
    }
    next();
  }

  mustNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(403).json({ status: res.statusCode, message: 'Forbidden' });
    }
    next();
  }
}
module.exports = AuthValidator;
