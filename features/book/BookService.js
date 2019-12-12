const { mergeMap } = require('rxjs/operators');

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
      mergeMap((library) => this.libraryRepository.update([{ archive: [library.id] }], book.params.library_id)),
    );
  }

  deleteBook(book) {
    return this.bookRepository.delete(book.params.book_id);
  }

  updateBook(book) {
    return this.bookRepository.update(book.body, book.params.book_id);
  }
}

module.exports = BookService;
