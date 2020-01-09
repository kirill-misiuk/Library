const mongoose = require('mongoose');
const { from, of } = require('rxjs');
const {
  mergeMap, toArray, filter,
} = require('rxjs/operators');
const { Library } = require('./LibraryModels');

class LibraryRepository {
  constructor() {
    this.url = process.env.MONGO_URL;
    this.database = process.env.MONGO_DATABASE;
    mongoose.connect(`${this.url}/${this.database}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
      .catch((e) => console.log('problem with connection ', e));
  }

  find() {
    return from(Library.find({}));
  }

  findOne(id) {
    return from(Library.findById(id));
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
          console.log(newLibrary);
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
