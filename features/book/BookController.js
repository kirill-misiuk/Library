class BookController {
  constructor(BookService) {
    this.bookService = BookService;
  }

  getAllBooks(req, res) {
    this.bookService.getAllBooks(req.params).subscribe({
      next: (data) => res.status(200).json({ status: 200, data }),
      error: (e) => res.status(400).json({ status: 400, message: e.message }),
    });
  }

  createBook(req, res) {
    this.bookService.createBook(req).subscribe({
      next: (data) => res.status(201).json({ status: 200, data }),
      error: (e) => res.status(400).json({ status: 400, message: e.message }),
    });
  }
}


module.exports = BookController;
