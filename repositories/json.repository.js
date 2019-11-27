const fs = require('fs');

class Book {
    constructor() {
        this.collection = JSON.parse(fs.readFileSync("./repositories/books.json"))
    }

    getBooks() {
        console.log('yes');
        return this.collection
    }
}

module.exports = Book;