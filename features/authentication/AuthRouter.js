const { check } = require('express-validator');
const Controller = require('./AuthController');
const Service = require('./AuthService');
const Repository = require('./db/AuthRepository');
const AuthHash = require('./AuthHash');
const AuthValidator = require('./AuthValidator');

const repository = new Repository();
const hash = new AuthHash();
const service = new Service(repository, hash);
const controller = new Controller(service);
const validator = new AuthValidator();

module.exports = (app) => {
  app.post('/auth/signin', [
    check('username').not().isEmpty().withMessage('You username is required'),
    check('password').not().isEmpty().isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
  ], validator.signIn, validator.mustNotAuthenticated, (req, res, next) => {
    controller.signIn(req, res, next);
  });
  app.post('/auth/signup', [
    check('username').not().isEmpty().withMessage('You username is required'),
    check('password').not().isEmpty().isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
  ], validator.signUp, validator.mustNotAuthenticated, (req, res, next) => controller.signUp(req, res, next));
  app.get('/auth/user', (req, res) => {
    res.json({ session: req.session, user: req.user, isAuth: req.isAuthenticated() });
  });
  app.post('/auth/logout', validator.mustAuthenticated, (req, res) => controller.logout(req, res));
};
