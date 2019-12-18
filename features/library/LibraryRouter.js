const Controller = require('./LibraryController');
const Service = require('./LibraryService');
const Repository = require('./LibraryRepository');
const { check} = require('express-validator');
const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);
module.exports = (app) => {
  app.get('/libraries', (req, res) => controller.getAllLibraries(req, res));
  app.post('/libraries', (req, res) => controller.createLibrary(req, res));
  app.get('/libraries/:library_id', (req, res) => controller.getById(req, res));
  app.put('/libraries/:id', [check('name').isString()], (req, res) => controller.updateLibrary(req, res));
  app.delete('/libraries/:library_id', (req, res) => controller.deleteLibrary(req, res));
};
