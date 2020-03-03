const { from } = require('rxjs');
const {
  mergeMap, map,
} = require('rxjs/operators');
const { Library } = require('./LibraryModel');

class LibraryRepository {
  find(options = {}, count, size) {
    return from(Library.find(options).skip(size * (count - 1)).limit(size).lean()
      .exec());
  }

  findOne(options) {
    return from(Library.findOne(options).lean().exec());
  }

  create(library) {
    return from(Library.create({ ...library }));
  }

  updateOne(cond, update) {
    return from(Library.updateOne(cond, update, { new: true })).pipe(
      mergeMap(() => from(Library.findOne(cond).lean().exec())),
    );
  }

  updateMany(cond, update) {
    return from(Library.updateMany(cond, update, { new: true }))
      .pipe(mergeMap(() => from(Library.find(cond).lean().exec())));
  }

  delete(ids) {
    return from(Library.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
      mergeMap((libraries) => from(Library.deleteMany({ _id: { $in: libraries } }).lean().exec())
        .pipe(map(() => libraries))),
    );
  }
}

module.exports = LibraryRepository;
