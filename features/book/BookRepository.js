const { of } = require('rxjs');
const fs = require('fs');

const db = JSON.parse(fs.readFileSync('./repositories/books.json'));
const uuidv4 = require('uuid/v4');

class bookRepository {
  constructor() {
    this.collection = db;
  }

  createBook(book) {

    this.collection.books.push({
      id: uuidv4(),
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
}


module.exports = bookRepository;
