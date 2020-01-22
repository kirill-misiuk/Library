const { from } = require('rxjs');

class LibraryService {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  getAllLibraries() {
    return this.libraryRepository.find();
  }

  createLibrary(library) {
    return this.libraryRepository.create(library);
  }

  getById(id) {
    return this.libraryRepository.findOne({ _id: id }).pipe(
    );
  }

  updateLibrary(data) {
    const { _id, archive, ...library } = data;
    return this.libraryRepository.updateOne(
      { _id },
      { ...library, $push: { $each: { archive } } },
    );
  }

  deleteLibrary(id) {
    return this.libraryRepository.delete(id);
  }

  getLibraries(bookId) {
    return from(this.libraryRepository.find({ archive: { $all: [bookId] } }));
  }
}

module.exports = LibraryService;
