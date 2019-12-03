class BookService {
    constructor(book) {
        this.book =  book;
    }
     getAll() {
        return this.book.getAll().pipe()
    }

}
module.exports =  BookService;
