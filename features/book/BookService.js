class BookService {
  constructor(BookRepository, LibraryService) {
    this.bookRepository = BookRepository;
    this.libraryServive = LibraryService;
  }

  getAllBooks() {
    return this.bookRepository.read();
  }

  createBook(book) {
    return this.bookRepository.create(book.body).pipe();
  }
}

module.exports = BookService;
