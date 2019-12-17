const { of } = require('rxjs');
const { map, mergeMap } = require('rxjs/operators');
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
    return of({
      id: uuidv4(),
      name: book.name,
      author: book.author,
      page_count: book.page_count,
      year: book.year,
    }).pipe(mergeMap((library) => {
      this.collection.books.push(library);
      return of(library);
    }));
  }

  delete(id) {
    return of(this.collection.books.find((book) => book.id === id) || null)
      .pipe(mergeMap((book) => {
        if (book) {
          return of(this.collection.books.splice(this.collection.books.indexOf(book), 1))
            .pipe(map((lib) => lib[0].id));
        }
        return of(book);
      }));
  }

  update(data) {
    return of(this.collection.books.find((lib) => lib.id === data.id) || null)
      .pipe(mergeMap((book) => {
        if (book) {
          const newbook = {
            name: data.name || book.name,
            author: data.author || book.author,
            page_count: data.page_count || book.page_count,
            year: data.year || book.year,
          };
          return of({ ...book, ...newbook });
        }
        return of(book);
      }));
  }
}

module.exports = bookRepository;
