const { of } = require('rxjs');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/books.json'));


class bookRepository {
  constructor() {
    this.collection = db;
  }

  find() {
    return of(this.collection);
  }

  findOne(id) {
    this.collection.books.find((book) => book.id === id);
    return of(this.collection.books);
  }

  create(book) {
    this.collection.books.push({
      id: uuidv4(),
      name: book.name,
      author: book.author,
      page_count: book.page_count,
      year: book.year,
    });
    return of(this.collection.books.slice(-1).pop());
  }



}


module.exports = bookRepository;
