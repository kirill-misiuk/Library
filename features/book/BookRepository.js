const { of } = require('rxjs');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/books.json'));


class bookRepository {
  constructor() {
    this.collection = db;
  }


  write(data) {
    fs.writeFileSync('./repositories/books.json', JSON.stringify(data));
  }

  createBook(id, book) {
    this.collection.books.push({
      id,
      name: book.name,
      author: book.author,
      page_count: book.page_count,
      year: book.year,
    });
    this.write(this.collection);
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
