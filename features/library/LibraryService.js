
const { map, throwError } = require('rxjs/operators');

class LibraryService {
  constructor(LibraryRepository) {
    this.libraryRepository = LibraryRepository;
  }

  getAllLibraries() {
    return this.libraryRepository.readAll();
  }

  createLibrary(library) {
    return this.libraryRepository.createLibrary(library);
  }

  getById(id) {
    return this.libraryRepository.readAll().pipe(
      map((libraries) => (libraries.filter((library) => library.id === id))),
      map((library) => (library.length !== 0 ? library : throwError())),
    );
  }
}
module.exports = LibraryService;
