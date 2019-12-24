const { of, from } = require('rxjs');
const {
  map, mergeMap, toArray, filter,
} = require('rxjs/operators');
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
    return of(this.collection.books.find((book) => book.id === id));
  }

  create(book) {
    const { libraryId, ...NewBook } = book;
    return of({ id: uuidv4(), ...NewBook }).pipe(mergeMap((library) => {
      this.collection.books.push(library);
      return of(library);
    }));
  }

  delete(ids) {
    return from(ids)
      .pipe(
        map((id) => this.collection.books.findIndex((lib) => lib.id === id)),
        mergeMap((index) => {
          if (index !== -1) {
            return of(this.collection.books.splice((index), 1));
          }
          return of(null);
        }),
        filter(Boolean),
        toArray(),
        map((books) => books.reduce((acc, v) => (acc.concat(...v.map((b) => b.id))), [])),
      );
  }

  update(data) {
    return of(this.collection.books.find((book) => book.id === data.id))
      .pipe(
        mergeMap((book) => {
          if (book) {
            this.collection.books = this.collection.books.map((boook) => {
              if (book.id === boook.id) {
                return {
                  ...boook,
                  ...data,
                };
              } return boook;
            });
            return of(this.collection.books);
          }
          return of(book);
        }),
        mergeMap((books) => books && of(books.find((book) => book.id === data.id)) || of(books)),
      );
  }
}

module.exports = bookRepository;
