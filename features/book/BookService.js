class bookService {
    constructor(book) {
        this.book =  book;
    }
     getAll() {
        return this.book.getAll().pipe()
    }

}
module.exports =  bookService
