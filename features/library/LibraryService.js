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
    return this.libraryRepository.update(library).pipe();
  }

  deleteLibrary(id) {
    return this.libraryRepository.delete(id);
  }
}
module.exports = LibraryService;
