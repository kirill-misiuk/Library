const { from, of } = require('rxjs');
const { mergeMap, map } = require('rxjs/operators');

class BookService {
  constructor(bookRepository, libraryRepository) {
    this.bookRepository = bookRepository;
    this.libraryRepository = libraryRepository;
  }

  getAllBooks(search, count, size) {
    return this.bookRepository.find({ $or: [{ name: { $regex: search || '' } }, { $where: `/^${search}.*/.test(this.year)` }] }, parseInt(count), parseInt(size));
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
        ).pipe(map(() => book))
          || of(book))),
    );
  }

  deleteBook(id) {
    return this.bookRepository.delete(id);
  }

  updateBook(editBook) {
    return this.bookRepository.update(editBook).pipe(
      mergeMap((book) => (
        editBook.libraryIds && editBook.libraryIds.length && this.libraryRepository.updateMany(
          { _id: { $in: editBook.libraryIds } },
          { $addToSet: { archive: book._id } },
        ).pipe(map(() => book))
            || of(book))),
    );
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
