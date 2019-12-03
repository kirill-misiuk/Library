
const Controller = require('./LibraryController');
const Service = require('./LibraryService');
const Repository = require('./LibraryRepository');

const repository = new Repository();
const service = new  Service(repository);
const controller = new Controller(service);
module.exports =  function (app) {
app.get('/libraries/all',(req,res)=> controller.getAll(req,res))
};
