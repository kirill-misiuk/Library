class LibraryService {
  constructor(LibraryRepository) {
    this.libraryRepository = LibraryRepository;
  }

  getLibraryList() {
    return this.libraryRepository.readAll();
  }

  createLibrary(library) {
    return this.libraryRepository.createLibrary(library);
  }

  getById(id) {
    return this.libraryRepository.getById(id);
  }

}
module.exports = LibraryService;
