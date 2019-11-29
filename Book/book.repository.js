class Book {
    constructor(db) {
        this.collection = db;
    }

    getAll() {
        return this.collection
    }

    getOne(id) {
        return this.collection.books[id]
    }
}


module.exports = Book;