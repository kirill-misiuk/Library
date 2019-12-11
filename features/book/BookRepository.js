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
    return of(this.collection.books.find((book) => book.id === id) || null);
  }

  create(book) {
    const newBook = {
      id: uuidv4(),
      name: book.name,
      author: book.author,
      page_count: book.page_count,
      year: book.year,
    };
    this.collection.books.push(newBook);
    return of(newBook);
  }

  delete(id) {
    const BooksID = this.collection.books.map((item) => item.id);
    const index = BooksID.indexOf(id);
    this.collection.books.splice(index, 1);
    return index !== -1 ? of(BooksID[index]) : of(null);
  }

  update() {

  }
}


module.exports = bookRepository;
