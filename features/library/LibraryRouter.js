const { check } = require('express-validator');
const Controller = require('./LibraryController');
const Service = require('./LibraryService');
const Repository = require('./LibraryRepository');
const Validator = require('./LibraryValidator');

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);
const validator = new Validator(controller);

module.exports = (app) => {
  app.get('/libraries', (req, res, next) => validator.getAllLibraries(req, res, next));
  app.post('/libraries', [check('name').isString(), check('archive').isArray()], (req, res, next) => validator.createLibrary(req, res, next));
  app.get('/libraries/:id', (req, res, next) => validator.getById(req, res, next));
  app.put('/libraries/:id', [check('name').isString(), check('archive').isArray()], (req, res, next) => validator.updateLibrary(req, res, next));
  app.delete('/libraries/:id', (req, res, next) => validator.deleteLibrary(req, res,next));
};
