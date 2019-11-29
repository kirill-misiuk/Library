const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/books.json"));
const {Observable} = require('rxjs');

class Book {
    constructor() {
        this.collection = db;
    }

    getAll() {
        return new Observable((observer) => {
            observer.next(this.collection)
        })
    }
}

module.exports = new Book;