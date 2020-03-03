const { check } = require('express-validator');
const AuthController = require('./AuthController');
const AuthService = require('./AuthService');
const AuthRepository = require('./db/AuthRepository');
const AuthHash = require('./AuthHash');
const AuthValidator = require('./AuthValidator');
const AuthSerializer = require('./AuthSerializer');
const AuthLocalStrategy = require('./AuthLocalStrategy');


const authRepository = new AuthRepository();
const authHash = new AuthHash();
const authSerializer = new AuthSerializer(authRepository);
const authLocalStrategy = new AuthLocalStrategy(authRepository, authHash, authSerializer);
const authService = new AuthService(authRepository, authHash, authLocalStrategy);
const authController = new AuthController(authService);
const authValidator = new AuthValidator();

module.exports = (app) => {
  app.post('/auth/signin', [
    check('username').not().isEmpty().withMessage('Your username is required'),
    check('password').not().isEmpty().isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
  ], authValidator.sign, authValidator.mustNotAuthenticated, (req, res, next) => authController.signIn(req, res, next));
  app.post('/auth/signup', [
    check('username').not().isEmpty().withMessage('Your username is required'),
    check('password').not().isEmpty().isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long'),
  ], authValidator.sign, authValidator.mustNotAuthenticated, (req, res, next) => authController.signUp(req, res, next));
  app.get('/auth/user', (req, res) => {
    res.json({ session: req.session, user: req.user, isAuth: req.isAuthenticated() });
  });
  app.post('/auth/logout', authValidator.mustAuthenticated, (req, res) => authController.logout(req, res));
};
