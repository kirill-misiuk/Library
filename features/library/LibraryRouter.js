const { check, query } = require('express-validator');
const LibraryController = require('./LibraryController');
const LibraryService = require('./LibraryService');
const LibraryRepository = require('./db/LibraryRepository');
const LibraryValidator = require('./LibraryValidator');

const libraryRepository = new LibraryRepository();
const libraryService = new LibraryService(libraryRepository);
const libraryController = new LibraryController(libraryService);
const libraryValidator = new LibraryValidator();

module.exports = (app) => {
  app.get('/libraries', [
    query('search').optional().isString(),
    query('count').optional().isNumeric(),
    query('size').optional().isNumeric(),
  ], libraryValidator.getAllLibraries, (req, res) => libraryController.getAllLibraries(req, res));

  app.post('/libraries', [
    check('name').isString(),
    check('about').isString(),
    check('archive').optional().isArray(),
  ], libraryValidator.createLibrary, (req, res) => libraryController.createLibrary(req, res));

  app.get('/libraries/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId()],
  libraryValidator.getById, (req, res) => libraryController.getById(req, res));

  app.get('/libraries/book/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId()],
  libraryValidator.getById, (req, res) => libraryController.getLibraries(req, res));

  app.put('/libraries/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isString().isMongoId(),
    check('name').optional().isString(),
    check('archive').optional().isArray(),
  ], libraryValidator.updateLibrary, (req, res) => libraryController.updateLibrary(req, res));

  app.delete('/libraries',
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId(),
    libraryValidator.deleteLibrary, (req, res) => libraryController.deleteLibrary(req, res));
};
