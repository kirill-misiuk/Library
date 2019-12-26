const Controller = require('./AuthController');
const Service = require('./AuthService');
const Repository = require('./AuthRepository');


const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

module.exports = (app) => {

};