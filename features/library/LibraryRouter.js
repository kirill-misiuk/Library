const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/libraries.json"));
const Controller = require('./LibraryController');
const Service = require('./LibraryService');
const Repository = require('./LibraryRepository');

const repository = new Repository(db);
const service = new  Service(repository);
const controller = new Controller(service);
module.exports =  function (app) {
app.get('/libraries/all',(req,res)=> controller.getAll(req,res))
};
