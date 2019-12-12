class BookController {
  constructor(BookService) {
    this.bookService = BookService;
  }

  getAllBooks(req, res) {
    this.bookService.getAllBooks().subscribe({
      next: (data) => res.status(200).json({ status: res.statusCode, data }),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  getById(req, res) {
    this.bookService.getById(req.params.book_id).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  createBook(req, res) {
    const data = {
      library_id: req.params.library_id,
      name: req.body.name,
      author: req.body.author,
      page_count: req.body.page_count,
      year: req.body.year,
    };
    this.bookService.createBook(data).subscribe({
      next: (book) => (book !== null ? res.status(201).json({ status: res.statusCode, book })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  deleteBook(req, res) {
    this.bookService.deleteBook(req.params.book_id).subscribe({
      next: (book) => (book !== null ? res.status(204).json({ status: 201, book })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  updateBook(req, res) {
    const data = {
      id: req.params.id,
      name: req.body.name,
      author: req.body.author,
      page_count: req.body.page_count,
      year: req.body.year,
    };
    this.bookService.updateBook(data).subscribe({
      next: (book) => (book !== null ? res.status(201).json({ status: 201, book })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }
}


module.exports = BookController;
