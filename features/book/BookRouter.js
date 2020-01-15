const { check } = require('express-validator');

const Controller = require('./BookController');
const BookService = require('./BookService');
const BookRepository = require('./db/BookRepository');
const LibraryRepository = require('../library/db/LibraryRepository');
const BookValidator = require('../book/BookValidator');

const repository = new BookRepository();
const libraryrepository = new LibraryRepository();
const service = new BookService(repository, libraryrepository);
const controller = new Controller(service);
const validator = new BookValidator();

module.exports = (app) => {
  app.get('/books', validator.getAllBooks, (req, res) => {
    controller.getAllBooks(req, res);
  });

  app.post('/books', [
    check('libraryId').optional().isString(),
    check('name').isString(),
    check('author').isString(),
    check('pageCount').isNumeric().isLength({ min: 1, max: 4 }),
    check('year').isNumeric().isLength({ max: 4, min: 1 }),
  ], validator.createBook, (req, res) => controller.createBook(req, res));

  app.get('/books/:id', validator.getById,
    check('id').exists({ checkNull: true, checkFalsy: true }).isString(),
    validator.getById,
    (req, res) => controller.getById(req, res));

  app.put('/books/:id', [
    check('id').exists({ checkNull: true, checkFalsy: true }).isString(),
    check('name').optional().isString(),
    check('author').optional().isString(),
    check('pageCount').optional().isNumeric().isLength({ min: 1, max: 4 }),
    check('year').optional().isNumeric().isLength({ max: 4, min: 1 }),
  ], validator.updateBook,
  (req, res) => controller.updateBook(req, res));

  app.delete('/books',
    check('id').exists({ checkNull: true, checkFalsy: true }),
    validator.deleteBook, (req, res) => controller.deleteBook(req, res));

  app.get('/books/library/:id', [
    check('id').exists({ checkNull: true, checkFalsy: true })],
  validator.getById, (req, res) => controller.getLibraryBooks(req, res));

};
