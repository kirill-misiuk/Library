const mongoose = require('mongoose');
const { from, of } = require('rxjs');
const { mergeMap, toArray, filter } = require('rxjs/operators');
const { Library } = require('./LibraryModels');

class LibraryRepository {
  constructor() {
    this.url = process.env.MONGO_URL;
    mongoose.connect(`${this.url}/libraries`, { useNewUrlParser: true, useUnifiedTopology: true })
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
    return of(this.collections.libraries.find((lib) => lib.id === data.id))
      .pipe(
        mergeMap((foundLibrary) => {
          if (foundLibrary) {
            this.collections.libraries = this.collections.libraries.map((library) => {
              if (library.id === foundLibrary.id) {
                return {
                  ...library,
                  ...data,
                  archive: Array.from(new Set([...library.archive, ...(data.archive || [])])),
                };
              } return library;
            });
            return of(this.collections.libraries);
          }
          return of(foundLibrary);
        }),
        mergeMap((libraries) => libraries && of(libraries.find((libary) => libary.id === data.id)) || of(libraries)),
      );
  }

  delete(ids) {
    return from(ids)
      .pipe(
        map((id) => this.collections.libraries.findIndex((lib) => lib.id === id)),
        mergeMap((foundIndex) => {
          if (foundIndex !== -1) {
            return of(this.collections.libraries.splice((foundIndex), 1));
          }
          return of(null);
        }),
        filter(Boolean),
        toArray(),
        map((deletedLibraries) => deletedLibraries.reduce((acc, v) => (acc.concat(...v.map((l) => l.id))), [])),
      );
  }
}

module.exports = LibraryRepository;
