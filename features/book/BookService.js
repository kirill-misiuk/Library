class BookService {
  constructor(BookRepository, LibraryService) {
    this.bookRepository = BookRepository;
    this.libraryServive = LibraryService;
  }

  getAllBooks() {
    return this.bookRepository.read();
  }

  createBook(book) {
    return this.bookRepository.create(book.body);
  }

  deleteBook(id) {
    return this.bookRepository.delete(id);
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }
}

module.exports = BookService;
