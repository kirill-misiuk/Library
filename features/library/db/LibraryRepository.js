const mongoose = require('mongoose');
const { from, of } = require('rxjs');
const {
  mergeMap, toArray, filter, tap,
} = require('rxjs/operators');
const { Library } = require('./LibraryModels');

class LibraryRepository {
  constructor() {
    this.url = process.env.MONGO_URL;
    this.database = process.env.MONGO_DATABASE;
    mongoose.connect(`${this.url}/${this.database}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
      .catch((e) => console.log('problem with connection ', e));
  }

  find() {
    return from(Library.find({})).pipe(tap((ddd) => console.log(ddd)));
  }

  findOne(id) {
    return from(Library.findById(id));
  }

  create(library) {
    return from(Library.create({ ...library }));
  }


  update(data) {
    return from(Library.findOne({ _id: data.id }).catch((e) => e))
      .pipe(mergeMap((foundLibrary) => {
        console.log(foundLibrary);
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
    return from(ids)
      .pipe(
        mergeMap((id) => from(Library.deleteOne({ _id: id }).then(((res) => {
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

module.exports = LibraryRepository;
