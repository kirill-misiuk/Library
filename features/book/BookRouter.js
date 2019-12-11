const Controller = require('./BookController');
const Service = require('./BookService');
const Repository = require('./BookRepository');
const LibraryService = require('../library/LibraryService');

const repository = new Repository();
const libraryservice = new LibraryService();
const service = new Service(repository, libraryservice);
const controller = new Controller(service);
module.exports = (app) => {
  app.get('/books/all', (req, res) => controller.getAllBooks(req, res));
  app.post('/books/add', (req, res) => controller.createBook(req, res));
  app.get('/:library_id/books/all', (req, res) => controller.getAllBooks(req, res));
  app.post('/:library_id/books/add', (req, res) => controller.createBook(req, res));
  app.put('/books/:book_id/update', (req, res) => controller.updateBook(req, res));
  app.delete('/books/:book_id/delete', (req, res) => controller.deleteBook(req,res));
};
