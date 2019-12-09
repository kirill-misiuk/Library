
const { map, throwError, tap } = require('rxjs/operators');

class LibraryService {
  constructor(LibraryRepository) {
    this.libraryRepository = LibraryRepository;
  }

  getAllLibraries() {
    return this.libraryRepository.read();
  }

  createLibrary(library) {
    return this.libraryRepository.create(library);
  }

  getById(id) {
    return this.libraryRepository.read().pipe(
      map((libraries) => (libraries.filter((library) => library.id === id))),
      map((library) => (library.length !== 0 ? library : throwError())),
    );
  }

  pushIntoArchive(BookID, LibraryID) {
    return this.libraryRepository.update(LibraryID).pipe(
      tap((v) => console.log(v)),
    );
  }
}
module.exports = LibraryService;
