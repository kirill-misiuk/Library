const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/books.json"));
class Book {
    constructor() {
        this.collection = db;
    }

    getAll() {
        return this.collection
    }

    getOne(id) {
        return this.collection.books[id]
    }
}


module.exports =  new Book;