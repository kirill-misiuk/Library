const { from,of} = require('rxjs');
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

  createBook(newBook) {
    return this.bookRepository.create(newBook).pipe(
      mergeMap((book) => this.libraryRepository.update({ id: newBook.libraryId, archive: [book.id] })
        .pipe(map(() => book))),
    );
  }

  deleteBook(id) {
    return this.bookRepository.delete(id);
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }

  getLibraryBooks(id) {
    return this.libraryRepository.findOne(id).pipe(
      mergeMap((foundLibrary) => {
        if (foundLibrary) {
          return from(this.bookRepository.findAll(foundLibrary.archive));
        }
        return of(null);
      }),
    );
  }
}

module.exports = BookService;
