const { mergeMap } = require('rxjs/operators');
const { of } = require('rxjs');

class BookService {
  constructor(BookRepository, LibraryRepository) {
    this.bookRepository = BookRepository;
    this.libraryRepository = LibraryRepository;
  }

  getAllBooks() {
    return this.bookRepository.find();
  }

  getById(id) {
    return this.bookRepository.findOne(id);
  }

  createBook(book) {
    return this.bookRepository.create(book).pipe(
      mergeMap((library) => {
        this.libraryRepository.update({ id: book.library_id, archive: [library.id] });
        return of(library);
      }),
    );
  }

  deleteBook(id) {
    return this.bookRepository.delete(id);
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }
}

module.exports = BookService;
