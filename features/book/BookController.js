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
    const { id } = req.params;
    this.bookService.getById(id).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  createBook(req, res) {
    const { id } = req.params;
    const book = req.body;
    this.bookService.createBook({ ...book, ...id }).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: res.statusCode, data })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  deleteBook(req, res) {
    let ids = req.query.id;
    if (!Array.isArray(ids)) ids = [ids];
    this.bookService.deleteBook(ids).subscribe({
      next: (data) => res.status(200).json({ status: 200, data }),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }

  updateBook(req, res) {
    const id = req.params;
    const book = req.body;
    this.bookService.updateBook({ ...book, ...id }).subscribe({
      next: (data) => (data !== null ? res.status(201).json({ status: 201, data })
        : res.status(404).json({ status: res.statusCode, message: 'Can`t find library id' })),
      error: (e) => res.status(400).json({ status: res.statusCode, message: e.message }),
    });
  }
}

module.exports = BookController;
