const { from, of } = require('rxjs');
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
    return this.bookRepository.findOne({ _id: id });
  }

  createBook(newBook) {
    return this.bookRepository.create(newBook).pipe(
      mergeMap((book) => (
        newBook.libraryIds && newBook.libraryIds.length && this.libraryRepository.updateMany(
          { _id: { $in: newBook.libraryIds } },
          { $push: { archive: book._id } },
        )
          .pipe(map(() => book))
          || of(book))),
    );
  }

  deleteBook(id) {
    return this.bookRepository.delete(id);
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }

  getLibraryBooks(id) {
    return this.libraryRepository.findOne({ _id: id }).pipe(
      mergeMap((foundLibrary) => {
        if (foundLibrary) {
          return from(this.bookRepository.find({ _id: { $in: foundLibrary.archive } }));
        }
        return of(null);
      }),
    );
  }
}

module.exports = BookService;
