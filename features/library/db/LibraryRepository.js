const { from } = require('rxjs');
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
    return from(Library.updateMany({ _id: data._id }, data.library, { new: true }))
      .pipe(mergeMap(() => from(Library.find({ _id: data._id }).lean().exec())));
  }

  delete(ids) {
    return from(Library.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
      mergeMap((libraries) => from(Library.deleteMany({ _id: { $in: libraries } }).lean().exec())
        .pipe(map(() => libraries))),
    );
  }
}

module.exports = LibraryRepository;
