const { mergeMap, tap } = require('rxjs/operators');
const { of } = require('rxjs');

class LibraryService {
  constructor(LibraryRepository) {
    this.libraryRepository = LibraryRepository;
  }

  getAllLibraries() {
    return this.libraryRepository.find();
  }

  createLibrary(library) {
    return this.libraryRepository.create(library)
      .pipe(mergeMap((lib) => this.libraryRepository.libraries.push(lib)));
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
}
module.exports = LibraryService;
