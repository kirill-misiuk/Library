const {Observable} = require('rxjs');
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./repositories/books.json'));
const uuidv4 = require('uuid/v4');
class bookRepository {
    constructor() {
        this.collection = db;
    }

    getAll() {
        return new Observable((observer) => {
            observer.next(this.collection);
        });
    }
    addBook(body){
        this.collection.books.push({id:uuidv4(),name:body.name,author:body.author,page_count:body.page_count,year:body.year})
        return new Observable((observer) => {
            observer.next(this.collection);
        });
    }
}

module.exports = bookRepository;