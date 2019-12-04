const Controller = require('./BookController');
const Service = require('./BookService');
const Repository = require('./BookRepository');
const LibraryRepository =require('../library/LibraryRepository');
const repository = new Repository();
const libraryrepository = new LibraryRepository();
const service = new Service(repository,libraryrepository);
const controller = new Controller(service);
module.exports = function (app) {
    app.get('/:library_id/books/all', (req, res) =>  controller.getAll(req, res));
    app.post('/:library_id/books/add', (req, res) =>  controller.addBook(req, res));
};