let Book = require('./book.repository');
const {Observable} = require('rxjs');



class bookService {
    constructor() {
        this.book = new Book()
    }

    getAll() {
        return new Observable((subject) => {
            subject.next(this.book.getAll())
        });
    }

    getOne(id) {
        return new Observable((subject) => {
            subject.next(this.book.getOne(id))
        })
    }
}

module.exports = bookService;
