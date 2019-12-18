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
    return this.libraryRepository.delete(['', '54fa1ba4-15b8-11ea-8d71-362b9e155667']);
  }
}
module.exports = LibraryService;
