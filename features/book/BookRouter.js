const { check } = require('express-validator');
const Controller = require('./BookController');
const Service = require('./BookService');
const Repository = require('./BookRepository');
const LibraryRepository = require('../library/LibraryRepository');
const BookValidator = require('../book/BookValidator');

const repository = new Repository();
const libraryrepository = new LibraryRepository();
const service = new Service(repository, libraryrepository);
const controller = new Controller(service);
const validator = new BookValidator();
module.exports = (app) => {
  app.get('/books', validator.getAllBooks, (req, res) => controller.getAllBooks(req, res));
  app.post('/books', [check('name').isString(), check('author').isString(), check('page_count').isNumeric().isLength({ min: 4, max: 4 }), check('year').isNumeric().isLength({ max: 4, min: 4 })], validator.createBook, (req, res) => controller.createBook(req, res));
  app.get('/:id/books', validator.getAllBooks, (req, res) => controller.getAllBooks(req, res));
  app.get('/books/:id', validator.getById, (req, res) => controller.getById(req, res));
  app.post('/:id/books', [check('name').isString(), check('author').isString(), check('page_count').isNumeric().isLength({ min: 4, max: 4 }), check('year').isNumeric().isLength({ max: 4, min: 4 })], validator.createBook, (req, res) => controller.createBook(req, res));
  app.put('/books/:id', validator.updateBook, (req, res) => controller.updateBook(req, res));
  app.delete('/books/:id', validator.deleteBook, (req, res) => controller.deleteBook(req, res));
};
