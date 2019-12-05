const { of } = require('rxjs');
const fs = require('fs');

const db = JSON.parse(fs.readFileSync('./repositories/books.json'));
const uuidv4 = require('uuid/v4');

class bookRepository {
  constructor() {
    this.collection = db;
  }

  createBook(id, book) {
    this.collection.books.push({
      id,
      name: book.name,
      author: book.author,
      page_count: book.page_count,
      year: book.year,
    });
    fs.writeFileSync('./repositories/books.json', JSON.stringify(this.collection));
    return of(this.collection.books);
  }

  readAll() {
    return of(this.collection);
  }

  createBookId() {
    return uuidv4();
  }
}


module.exports = bookRepository;
