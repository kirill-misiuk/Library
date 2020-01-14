const { from, of } = require('rxjs');
const {
  mergeMap, toArray, map,
} = require('rxjs/operators');
const { Book } = require('./BookModel');

class BookRepository {
  find(options = {}) {
    return from(Book.find(options));
  }

  findOne(options) {
    return from(Book.findOne(options));
  }

  create(book) {
    const { libraryId, ...Newbook } = book;
    return from(Book.create({ ...Newbook }));
  }


  update(data) {
    return from(Book.findOne({ _id: data.id }))
      .pipe(mergeMap((foundLibrary) => {
        if (foundLibrary) {
          return from(Book.findByIdAndUpdate(data.id, { ...data }, { new: true }));
        }
        return of(foundLibrary);
      }));
  }

  delete(ids) {
    return from(Book.find({ _id: { $in: ids } })).pipe(
      mergeMap((books) => from(books.map((book) => book.id))),
      toArray(),
      map((foundIds) => {
        Book.deleteMany({ _id: { $in: foundIds } }).exec();
        return foundIds;
      }),
    );
  }
}

module.exports = BookRepository;
