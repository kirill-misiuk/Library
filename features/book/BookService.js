const { mergeMap, map } = require('rxjs/operators');

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

  createBook(Book) {
    return this.bookRepository.create(Book).pipe(
      mergeMap((book) => this.libraryRepository.update({ id: Book.id, archive: [book.id] })
        .pipe(map(() => book))),
    );
  }

  deleteBook(id) {
    return this.bookRepository.delete(id)
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }
}

module.exports = BookService;
