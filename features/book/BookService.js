const { tap, mergeMap } = require('rxjs/operators');

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
      // tap((v) => this.libraryRepository.update(book.params.library_id, v.id)),
      mergeMap((v) => this.libraryServive.pushIntoArchive(book.params.library_id, v.id)),
    );
  }
}

module.exports = BookService;
