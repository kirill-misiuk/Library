class BookController {
    constructor(BookService) {
        this.bookService = BookService;
    }

    getAll(req, res) {
        this.bookService.getAll().subscribe({
            next: data => res.status(200).json({status: 200, data}),
            error: e => res.status(400).json({status: 400, message: e.message})
        });
    }
    addBook(req,res){
        this.bookService.addBook(req.body).subscribe({
            next: data => res.status(201).json({status: 200, data}),
            error: e => res.status(400).json({status: 400, message: e.message})
        });
    }
}


module.exports = BookController;
