const { from, of } = require('rxjs');
const {
  mergeMap, map,
} = require('rxjs/operators');
const { Book } = require('./BookModel');

class BookRepository {
  find(options = {}) {
    return from(Book.find(options).lean().exec());
  }

  findOne(options) {
    return from(Book.findOne(options).lean().exec());
  }

  create(book) {
    const { libraryId, ...Newbook } = book;
    return from(Book.create({ ...Newbook }));
  }


  update(data) {
    return from(Book.findOne({ _id: data._id }).lean().exec())
      .pipe(mergeMap((foundLibrary) => {
        if (foundLibrary) {
          return from(Book.findByIdAndUpdate(data._id, { ...data }, { new: true }));
        }
        return of(foundLibrary);
      }));
  }

  delete(ids) {
    return from(Book.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
      mergeMap((books) => from(Book.deleteMany({ _id: { $in: books } }).lean().exec())
        .pipe(map(() => books))),
    );
  }
}

module.exports = BookRepository;
