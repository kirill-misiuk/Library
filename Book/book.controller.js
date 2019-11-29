const bookService = require('./book.service');

module.exports = function (app) {

    app.get('/:library/books/all', (req, res)=> {
            const bookservice = new bookService();
            bookservice.getAll().subscribe({
                next: data=>res.status(200).json({status: 200,data, message: 'Succesfull GET All'}),
               error: e => res.status(400).json({status: 400, message: e.message})
            });

    });
    app.get('/:library/books/:id',(req,res)=> {
        const bookservice = new bookService();
        bookservice.getOne(req.params.id).subscribe({
            next: data => res.status(200).json({status: 200, data, message: 'Succesfull GET All'}),
            error: e => res.status(400).json({status: 400, message: e.message})
        });
    });

};