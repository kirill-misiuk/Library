class bookService {
    constructor() {
        this.book = require('./book.repository');
    }

    getAll() {
        return this.book.getAll().pipe()
    }

}

module.exports = new bookService;
