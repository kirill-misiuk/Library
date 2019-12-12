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
    const Book = this.collection.books.find((book) => book.id === id) || false;
    if (Book) {
      this.collection.books.splice(this.collection.books.indexOf(Book), 1);
      return of(Book.id);
    }
    return of(null);
  }

  update(data) {
    const book = this.collection.books.find((lib) => lib.id === data.id) || false;
    if (book) {
      const newbook = {
        name: data.name || book.name,
        author: data.author || book.author,
        page_count: data.page_count || book.page_count,
        year: data.year || book.year,
      };
      const copy = { ...book, ...newbook };
      return of(copy);
    }
    return of(null);
  }
}


module.exports = bookRepository;
