const Controller = require('./LibraryController');
const Service = require('./LibraryService');
const Repository = require('./LibraryRepository');

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);
module.exports = (app) => {
  app.get('/libraries/all', (req, res) => controller.getAllLibraries(req, res));
  app.post('/libraries/add', (req, res) => controller.createLibrary(req, res));
  app.get('/libraries/library/:library_id', (req, res) => controller.getById(req, res));
  app.put('/libraries/:library_id/update', (req, res) => controller.updateLibrary(req, res));
  app.post('/libraries/:library_id/delete', (req, res) => controller.deleteLibrary(req, res));
};
