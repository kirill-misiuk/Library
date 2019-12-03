class BookService {
    constructor(BookRepository) {
        this.bookRepository =  BookRepository;
    }
    getAll() {
        return this.bookRepository.getAll();
    }
    addBook(body){
        return this.bookRepository.addBook(body)
    }
}
module.exports =  BookService;
