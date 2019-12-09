
const { map, throwError } = require('rxjs/operators');

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
    return this.libraryRepository.findOne(id);
  }
}
module.exports = LibraryService;
