const { tap } = require('rxjs/operators');

class BookService {
  constructor(BookRepository, LibraryRepository) {
    this.bookRepository = BookRepository;
    this.libraryRepository = LibraryRepository;
  }

  getAllBooks() {
    return this.bookRepository.find();
  }

  getById(id) {
    return this.bookRepository.findOne(id);
  }

  createBook(book) {
    return this.bookRepository.create(book.body).pipe(
      tap((v) => this.libraryRepository.update([{ archive: [v.id] }], book.params.library_id)),
    );
  }

  deleteBook(book) {
    return this.bookRepository.delete(book.params.book_id);
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }
}

module.exports = BookService;
