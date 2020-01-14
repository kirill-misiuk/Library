const { check } = require('express-validator');
const LibraryController = require('./LibraryController');
const LibraryService = require('./LibraryService');
const LibraryRepository = require('./db/LibraryRepository');
const LibraryValidator = require('./LibraryValidator');

const repository = new LibraryRepository();
const service = new LibraryService(repository);
const controller = new LibraryController(service);
const validator = new LibraryValidator();

module.exports = (app) => {
  app.get('/libraries', validator.getAllLibraries, (req, res) => controller.getAllLibraries(req, res));

  app.post('/libraries', [
    check('name').isString(),
    check('archive').isArray(),
  ], validator.createLibrary, (req, res) => controller.createLibrary(req, res));

  app.get('/libraries/:id', [
    check('id').exists({ checkNull: true, checkFalsy: true })],
  validator.getById, (req, res) => controller.getById(req, res));

  app.put('/libraries', [
    check('id').exists({ checkNull: true, checkFalsy: true }).isString(),
    check('name').optional().isString(),
    check('archive').optional().isArray(),
  ], validator.updateLibrary, (req, res) => controller.updateLibrary(req, res));

  app.delete('/libraries',
    check('id').exists({ checkNull: true, checkFalsy: true }),
    validator.deleteLibrary, (req, res) => controller.deleteLibrary(req, res));
};
