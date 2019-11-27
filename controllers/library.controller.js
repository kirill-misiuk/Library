const libraryService = require('../services/library.service');
module.exports = function (app) {
    app.get('/libraries/all', async function (req, res) {

        try {
            let books = libraryService.getBooks();
            console.log(libraryService.getBooks())
            return res.status(200).json({status: 200, limit: books, message: 'Succesfull GET limit'})
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message})
        }
    })

};