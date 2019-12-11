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

  getById(req, res) {
    this.bookService.getById(req.params.book_id).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: 404, message: 'Can`t find library' })),
      error: (e) => res.status(400).json({ status: 400, message: e.message }),
    });
  }

  createBook(req, res) {
    this.bookService.createBook(req).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: 404, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: 400, message: e.message }),
    });
  }

  deleteBook(req, res) {
    this.bookService.deleteBook(req).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: 404, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: 400, message: e.message }),
    });
  }

  updateBook(req, res) {
    this.bookService.updateBook(req).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: 404, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: 400, message: e.message }),
    });
  }
}


module.exports = BookController;
