class BookService {
  constructor(BookRepository, LibraryRepository) {
    this.bookRepository = BookRepository;
    this.libraryRepository = LibraryRepository;
  }

  getBookList() {
    return this.bookRepository.readAll();
  }

  createBook(book) {
    if (book.params.library_id) {
      this.libraryRepository.writeBookArchive(book.body.id,book.params.library_id);
    }
    return this.bookRepository.createBook(book.body);
  }
}

module.exports = BookService;
