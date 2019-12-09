const { mergeMap } = require('rxjs/operators');

class BookService {
  constructor(BookRepository, LibraryService) {
    this.bookRepository = BookRepository;
    this.libraryServive = LibraryService;
  }

  getAllBooks() {
    return this.bookRepository.read();
  }

  createBook(book) {
    return this.bookRepository.create(book.body).pipe(
      mergeMap((v) => this.libraryServive.pushIntoArchive()),
    );
  }
}

module.exports = BookService;
