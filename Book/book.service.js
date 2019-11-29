const {Observable} = require('rxjs');
class bookService {
    constructor() {
        this.book = require('./book.repository');
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

module.exports = new bookService;
