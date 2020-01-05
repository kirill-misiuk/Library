
const Controller = require('./AuthController');
const Service = require('./AuthService');
const Repository = require('./AuthRepository');


const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

module.exports = (app) => {
  app.post('/auth/signin', (req, res, next) => {
    controller.signIn(req, res, next);
  });
  app.post('/auth/signup', (req, res, next) => controller.signUp(req, res, next));
  app.get('/user', (req, res) => {
    res.json({ session: req.session, user: req.user || false, isAuth: req.isAuthenticated() });
  });
  app.post('/auth/logout', (req, res) => controller.logout(req, res));
};
