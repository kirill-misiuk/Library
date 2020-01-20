const { check , checkSchema} = require('express-validator');
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
    check('archive').optional().isArray(),
  ], validator.createLibrary, (req, res) => controller.createLibrary(req, res));

  app.get('/libraries/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId()],
  validator.getById, (req, res) => controller.getById(req, res));

  app.get('/libraries/book/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId()],
  validator.getById, (req, res) => controller.getLibraries(req, res));

  app.put('/libraries/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isString().isMongoId(),
    check('name').optional().isString(),
    check('archive').optional().isArray(),
  ], validator.updateLibrary, (req, res) => controller.updateLibrary(req, res));

  app.delete('/libraries',
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId(),
    validator.deleteLibrary, (req, res) => controller.deleteLibrary(req, res));
};
