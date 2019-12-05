class BookService {
  constructor(BookRepository) {
    this.bookRepository = BookRepository;
  }

  getBookList() {
    return this.bookRepository.readAll();
  }

  createBook(book) {
    return this.bookRepository.createBook(book.body);
  }
}

module.exports = BookService;
