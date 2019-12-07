const { of} = require('rxjs');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/books.json'));


class bookRepository {
  constructor() {
    this.collection = db;
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

  read() {
    return of(this.collection);
  }
}


module.exports = bookRepository;
