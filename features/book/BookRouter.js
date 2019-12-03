
const Controller = require('./BookController');
const Service = require('./BookService');
const Repository = require('./BookRepository');
const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);
module.exports = function (app) {
    app.get("/:library/books/all", (req, res) =>  controller.getAll(req, res))
};