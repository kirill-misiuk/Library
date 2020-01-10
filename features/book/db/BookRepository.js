const { from, of } = require('rxjs');
const {
  mergeMap, toArray, filter,
} = require('rxjs/operators');
const { Book } = require('./BookModels');

class BookRepository {
  constructor() {}

  find() {
    return from(Book.find({}));
  }

  findAll(ids) {
    return from(Book.find({ _id: ids }));
  }

  findOne(id) {
    return from(Book.findById(id));
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
    return from(ids)
      .pipe(
        mergeMap((id) => from(Book.deleteOne({ _id: id }).then(((res) => {
          if (res.deletedCount !== 0) {
            return id;
          }
          return null;
        })))),
        filter(Boolean),
        toArray(),
      );
  }
}

module.exports = BookRepository;
