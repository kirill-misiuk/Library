const Controller = require('./BookController');
const Service = require('./BookService');
const Repository = require('./BookRepository');
const LibraryRepository = require('../library/LibraryRepository');


const repository = new Repository();
const libraryrepository = new LibraryRepository();
const service = new Service(repository, libraryrepository);
const controller = new Controller(service);
module.exports = (app) => {
  app.get('/books', (req, res) => controller.getAllBooks(req, res));
  app.post('/books', (req, res) => controller.createBook(req, res));
  app.get('/:library_id/books', (req, res) => controller.getAllBooks(req, res));
  app.get('/books/:book_id', (req, res) => controller.getById(req, res));
  app.post('/:library_id/books', (req, res) => controller.createBook(req, res));
  app.put('/books/:book_id', (req, res) => controller.updateBook(req, res));
  app.delete('/books/:book_id', (req, res) => controller.deleteBook(req, res));
};
