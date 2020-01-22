const { from } = require('rxjs');

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
    return this.libraryRepository.findOne({ _id: id }).pipe(
    );
  }

  updateLibrary(data) {
    return this.libraryRepository.updateOne({ _id: { $in: data._id } }, { name: data.name, $push: { $each: { archive: data.archive } } });
  }

  deleteLibrary(id) {
    return this.libraryRepository.delete(id);
  }

  getLibraries(bookId) {
    return from(this.libraryRepository.find({ archive: { $all: [bookId] } }));
  }
}

module.exports = LibraryService;
