const { from, of } = require('rxjs');
const {
  mergeMap, map,
} = require('rxjs/operators');
const { Library } = require('./LibraryModel');

class LibraryRepository {
  find(options = {}) {
    return from(Library.find(options).lean().exec());
  }

  findOne(options) {
    return from(Library.findOne(options).lean().exec());
  }

  create(library) {
    return from(Library.create({ ...library }));
  }


  update(data) {
    return from(Library.findOne({ _id: data.id }).lean().exec())
      .pipe(mergeMap((foundLibrary) => {
        if (foundLibrary) {
          const newLibrary = {
            ...data,
            archive: Array.from(new Set([...foundLibrary.archive, ...(data.archive || [])])),
          };
          return from(Library.findByIdAndUpdate(data.id, newLibrary, { new: true }).lean().exec());
        }
        return of(foundLibrary);
      }));
  }

  delete(ids) {
    return from(Library.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
      mergeMap((libraries) => from(Library.deleteMany({ _id: { $in: libraries } }).lean().exec())
        .pipe(map(() => libraries))),
    );
  }
}

module.exports = LibraryRepository;
