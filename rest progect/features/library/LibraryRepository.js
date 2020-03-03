const { of, from } = require('rxjs');
const {
  mergeMap, map, toArray, filter,
} = require('rxjs/operators');

const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/libraries.json'));

class LibraryRepository {
  constructor() {
    this.collections = db;
  }

  find() {
    return of(this.collections.libraries);
  }

  findOne(id) {
    return of(this.collections.libraries.find((library) => library.id === id));
  }

  create(library) {
    return of({ id: uuidv4(), ...library })
      .pipe(mergeMap((lib) => {
        this.collections.libraries.push(lib);
        return of(lib);
      }));
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
