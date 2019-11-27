const bookService = require('./book.service');
module.exports = function (app) {
    app.get('/libraries/all', module.getAll = (req, res)=> {
        try {
           bookService.getBooks().then(data=> res.status(200).json({status: 200,  data, message: 'Succesfull GET limit'}));
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message})
        }
    })

};