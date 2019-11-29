const Controller = require('./book.controller');
module.exports = function (app) {
    app.get("/:library/books/all",(req,res)=>Controller.getAll(req,res))
};