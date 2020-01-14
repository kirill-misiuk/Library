const { from, of } = require('rxjs');
const {
  mergeMap, toArray, map,
} = require('rxjs/operators');
const { Library } = require('./LibraryModel');

class LibraryRepository {
  find(options = {}) {
    return from(Library.find(options));
  }

  findOne(options) {
    return from(Library.findById(options));
  }

  create(library) {
    return from(Library.create({ ...library }));
  }


  update(data) {
    return from(Library.findOne({ _id: data.id }))
      .pipe(mergeMap((foundLibrary) => {
        if (foundLibrary) {
          const newLibrary = {
            ...data,
            archive: Array.from(new Set([...foundLibrary.archive, ...(data.archive || [])])),
          };
          return from(Library.findByIdAndUpdate(data.id, newLibrary, { new: true }));
        }
        return of(foundLibrary);
      }));
  }

  delete(ids) {
    return from(Library.find({ _id: { $in: ids } })).pipe(
      mergeMap((libraries) => from(libraries.map((library) => library.id))),
      toArray(),
      map((foundIds) => {
        Library.deleteMany({ _id: { $in: foundIds } }).exec();
        return foundIds;
      }),
    );
  }
}

module.exports = LibraryRepository;
