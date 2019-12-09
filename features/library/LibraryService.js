const { map, throwError } = require('rxjs/operators');

class LibraryService {
  constructor(LibraryRepository) {
    this.libraryRepository = LibraryRepository;
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

  updateLibrary(library) {
    return this.libraryRepository.update(library.body, library.params.library_id).pipe(
      map((v) => (v.length === 0 ? throwError() : v)),
    );
  }

  deleteLibrary(id) {
    return this.libraryRepository.delete(id).pipe(
      map((v) => (v.length === 0 ? throwError() : v)),
    );
  }
}
module.exports = LibraryService;
