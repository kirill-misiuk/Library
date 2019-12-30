
const Controller = require('./AuthController');
const Service = require('./AuthService');
const Repository = require('./AuthRepository');


const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

module.exports = (app) => {
  controller.initialize();
  app.post('/signin', (req, res, next) => controller.signIn(req, res, next));
  app.get('/user', (req, res) => console.log(req.user));
};