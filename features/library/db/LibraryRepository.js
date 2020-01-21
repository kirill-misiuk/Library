const { from} = require('rxjs');
const {
  mergeMap, map, toArray,
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
    const { _id, ...libraryData } = data;
    return from(Library.find({ _id }).lean().exec())
      .pipe(mergeMap((foundLibrary) => from(foundLibrary)
        .pipe(
          map((library) => ({
            ...library,
            ...libraryData,
            archive: Array.from(new Set([...library.archive, ...(libraryData.archive || [])])),
          })),
          mergeMap((library) => from(Library.updateOne({ _id: library._id }, library, { new: true }).lean().exec())
            .pipe(map(() => library))),
          toArray(),
        )));
  }

  delete(ids) {
    return from(Library.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
      mergeMap((libraries) => from(Library.deleteMany({ _id: { $in: libraries } }).lean().exec())
        .pipe(map(() => libraries))),
    );
  }
}

module.exports = LibraryRepository;
