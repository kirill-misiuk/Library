const { check,query } = require('express-validator');
const Controller = require('./BookController');
const BookService = require('./BookService');
const BookRepository = require('./db/BookRepository');
const LibraryRepository = require('../library/db/LibraryRepository');
const BookValidator = require('../book/BookValidator');

const bookRepository = new BookRepository();
const libraryRepository = new LibraryRepository();
const bookService = new BookService(bookRepository, libraryRepository);
const bookController = new Controller(bookService);
const bookValidator = new BookValidator();

module.exports = (app) => {
  app.get('/books', [
    query('search').optional().isString(),
    query('count').optional().isNumeric(),
    query('size').optional().isNumeric(),
  ], bookValidator.getAllBooks, (req, res) => {
    bookController.getAllBooks(req, res);
  });

  app.post('/books', [
    check('libraryIds').optional().isArray(),
    check('name').isString(),
    check('author').isString(),
    check('pageCount').isNumeric().isLength({ min: 1, max: 4 }),
    check('year').isNumeric().isLength({ max: 4, min: 1 }),
    check('title').isString().isLength({ min: 10, max: 2000 }),
    check('price').isNumeric().isLength({ min: 1, max: 10 }),
  ], bookValidator.createBook, (req, res) => bookController.createBook(req, res));

  app.get('/books/:_id', bookValidator.getById,
    check('_id').exists({ checkNull: true, checkFalsy: true }).isString().isMongoId(),
    bookValidator.getById,
    (req, res) => bookController.getById(req, res));

  app.put('/books/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isString().isMongoId(),
    check('name').optional().isString(),
    check('author').optional().isString(),
    check('pageCount').optional().isNumeric().isLength({ min: 1, max: 4 }),
    check('year').optional().isNumeric().isLength({ max: 4, min: 1 }),
  ], bookValidator.updateBook,
  (req, res) => bookController.updateBook(req, res));

  app.delete('/books',
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId(),
    bookValidator.deleteBook, (req, res) => bookController.deleteBook(req, res));

  app.get('/books/library/:_id', [
    check('_id').exists({ checkNull: true, checkFalsy: true }).isMongoId()],
  bookValidator.getById, (req, res) => bookController.getLibraryBooks(req, res));
};
