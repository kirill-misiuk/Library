
const passport = require('passport');
const Controller = require('./AuthController');
const Service = require('./AuthService');
const Repository = require('./AuthRepository');


const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

module.exports = (app) => {
  controller.initialize();
  app.post('/signin', passport.authenticate('local', { session: true}), (req, res) => controller.signIn(req, res));
  app.get('/user',(req,res)=>console.log(req.user));
};
