class BookService {
  constructor(BookRepository, LibraryRepository) {
    this.bookRepository = BookRepository;
    this.libraryRepository = LibraryRepository;
  }

  getBookList() {
    return this.bookRepository.readAll();
  }

  createBook(book) {
    const id = this.bookRepository.createBookId();
    if (book.params.library_id) {
      this.libraryRepository.writeBookArchive(id, book.params.library_id);
    }
    return this.bookRepository.createBook(id, book.body);
  }
}

module.exports = BookService;
