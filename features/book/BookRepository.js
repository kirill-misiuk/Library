const {Observable} = require('rxjs');
const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/books.json"));
class bookRepository {
    constructor() {
        this.collection = db;
    }

    getAll() {
        return new Observable((observer) => {
            observer.next(this.collection)
        })
    }
}

module.exports = bookRepository;