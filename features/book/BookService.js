class BookService {
  constructor(BookRepository, LibraryService) {
    this.bookRepository = BookRepository;
    this.libraryServive = LibraryService;
  }

  getAllBooks() {
    return this.bookRepository.find();
  }

  getById(id) {
    return this.bookRepository.findOne(id);
  }

  createBook(book) {
    return this.bookRepository.create(book.body);
  }

  deleteBook(book) {
    return this.bookRepository.delete(book.params.book_id);
  }

  updateBook(book) {
    return this.bookRepository.update(book);
  }
}

module.exports = BookService;
