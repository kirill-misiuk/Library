const { tap } = require('rxjs/operators');

class BookService {
  constructor(BookRepository, LibraryRepository) {
    this.bookRepository = BookRepository;
    this.libraryRepository = LibraryRepository;
  }

  getAllBooks(book) {
    if (book.params.library_id) {
    }
    return this.bookRepository.readAll();
  }

  createBook(book) {
    return this.bookRepository.create(book.body).pipe(
      tap((v) => this.libraryRepository.writeBookArchive(v.id, book.params.library_id)),
    );
  }
}

module.exports = BookService;
