let Book = require('./book.repository');
const {Observable} = require('rxjs');
const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/books.json"));


class bookService {
    constructor() {
        this.book = new Book(db)
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
