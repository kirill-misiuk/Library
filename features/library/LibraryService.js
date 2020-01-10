const { of, from } = require('rxjs');
const {
  mergeMap, map, toArray, filter, tap, combineAll, mergeAll,
} = require('rxjs/operators');

class LibraryService {
  constructor(LibraryRepository, BookRepository) {
    this.libraryRepository = LibraryRepository;
    this.bookRepository = BookRepository;
  }

  getAllLibraries() {
    return this.libraryRepository.find();
  }

  createLibrary(library) {
    return this.libraryRepository.create(library);
  }

  getById(id) {
    return this.libraryRepository.findOne(id).pipe(
    );
  }

  updateLibrary(data) {
    return this.libraryRepository.update(data).pipe();
  }

  deleteLibrary(id) {
    return this.libraryRepository.delete(id);
  }

  getLibraryBooks(id) {
    return this.libraryRepository.findOne(id).pipe(
      mergeMap((foundLibrary) => {
        if (foundLibrary) {
          return from(foundLibrary.archive)
            .pipe(mergeMap((BookId) => this.bookRepository.findOne(BookId)),
              filter(Boolean),
              toArray());
        }
        return of(null);
      }),
    );
  }
}

module.exports = LibraryService;
