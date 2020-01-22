class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  getAllBooks(req, res) {
    this.bookService.getAllBooks().subscribe({
      next: (data) => res.status(200).json({ status: res.statusCode, data }),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  getById(req, res) {
    const { _id } = req.params;
    this.bookService.getById(_id).subscribe({
      next: (data) => (data ? res.status.json({ status: 200, data })
        : res.status(404).json({ status: res.statusCode, message: 'Not found' })),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  getLibraryBooks(req, res) {
    const { _id } = req.params;
    this.bookService.getLibraryBooks(_id).subscribe({
      next: (data) => (!data
        ? res.status(404).json({ status: res.statusCode, message: 'Not found' })
        : res.status(200).json({ status: res.statusCode, data })),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  createBook(req, res) {
    const book = req.body;
    this.bookService.createBook(book).subscribe({
      next: (data) => (data ? res.status(201).json({ status: res.statusCode, data })
        : res.status(404).json({ status: res.statusCode, message: 'Not found' })),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  deleteBook(req, res) {
    const ids = req.query._id;
    this.bookService.deleteBook(Array.isArray(ids) ? ids : [ids]).subscribe({
      next: (data) => res.status(200).json({ status: 200, data }),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }

  updateBook(req, res) {
    const book = req.body;
    this.bookService.updateBook(book).subscribe({
      next: (data) => (data ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: res.statusCode, message: 'Not found' })),
      error: (e) => res.status(e.statusCode || 400).json({ status: res.statusCode, message: e.message }),
    });
  }
}

module.exports = BookController;
