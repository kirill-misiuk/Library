const { check,query } = require('express-validator');
const AuthController = require('./AuthController');
const AuthService = require('./AuthService');
const AuthRepository = require('./db/AuthRepository');
const AuthHash = require('./AuthHash');
const AuthValidator = require('./AuthValidator');

const repository = new AuthRepository();
const hash = new AuthHash();
const service = new AuthService(repository, hash);
const controller = new AuthController(service);
const validator = new AuthValidator();

module.exports = (app) => {
  app.post('/auth', [
    query('strategy').not().isEmpty().isIn(['local-signin', 'local-signup'])
      .withMessage(' Wrong method.Must be signin or signup'),
    check('username').not().isEmpty().withMessage('You username is required'),
    check('password').not().isEmpty().isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
  ], validator.sign, validator.mustNotAuthenticated, (req, res, next) => controller.sign(req, res, next));
  app.get('/auth/user', (req, res) => {
    res.json({ session: req.session, user: req.user, isAuth: req.isAuthenticated() });
  });
  app.post('/auth/logout', validator.mustAuthenticated, (req, res) => controller.logout(req, res));
};
