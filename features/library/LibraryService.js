const { map } = require('rxjs/operators');
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
    return this.libraryRepository.delete(id)
      .pipe(map((ids) => ids.filter((item) => item !== null)));
  }
}
module.exports = LibraryService;
