const { check } = require('express-validator');
const Controller = require('./LibraryController');
const Service = require('./LibraryService');
const Repository = require('./db/LibraryRepository');
const Validator = require('./LibraryValidator');
const BookRepository = require('../book/db/BookRepository');

const repository = new Repository();
const bookrepository = new BookRepository();
const service = new Service(repository, bookrepository);
const controller = new Controller(service);
const validator = new Validator();

module.exports = (app) => {
  app.get('/libraries', validator.getAllLibraries, (req, res) => controller.getAllLibraries(req, res));

  app.post('/libraries', [
    check('name').isString(),
    check('archive').isArray(),
  ], validator.createLibrary, (req, res) => controller.createLibrary(req, res));

  app.get('/libraries/:id', [
    check('id').exists({ checkNull: true, checkFalsy: true })],
  validator.getById, (req, res) => controller.getById(req, res));

  app.get('/libraries/books/:id', [
    check('id').exists({ checkNull: true, checkFalsy: true })],
  validator.getById, (req, res) => controller.getLibraryBooks(req, res));

  app.put('/libraries', [
    check('id').exists({ checkNull: true, checkFalsy: true }).isString(),
    check('name').optional().isString(),
    check('archive').optional().isArray(),
  ], validator.updateLibrary, (req, res) => controller.updateLibrary(req, res));

  app.delete('/libraries',
    check('id').exists({ checkNull: true, checkFalsy: true }),
    validator.deleteLibrary, (req, res) => controller.deleteLibrary(req, res));
};
