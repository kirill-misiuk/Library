class BookController {
    constructor(bookservice) {
        this.bookService = bookservice;
    }

    getAll(req, res) {
        this.bookService.getAll().subscribe({
            next: data => res.status(200).json({status: 200, data, message: 'Succesfull GET All'}),
            error: e => res.status(400).json({status: 400, message: e.message})
        });
    }
}


module.exports = BookController;
