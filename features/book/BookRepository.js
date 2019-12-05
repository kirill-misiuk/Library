const { of } = require('rxjs');
const fs = require('fs');

const db = JSON.parse(fs.readFileSync('./repositories/books.json'));
const uuidv4 = require('uuid/v4');

class bookRepository {
  constructor() {
    this.collection = db;
  }

  createBook(book) {
    return of(this.collection.books.push({
      id: uuidv4(),
      name: book.name,
      author: book.author,
      page_count: book.page_count,
      year: book.year,
    }));
  }

  readAll() {
    return of(this.collection);
  }
}


module.exports = bookRepository;
