const { of } = require('rxjs');
const { mergeMap, map } = require('rxjs/operators');

const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/libraries.json'));

class libraryRepository {
  constructor() {
    this.collections = db;
  }

  find() {
    return of(this.collections.libraries);
  }

  findOne(id) {
    return of(this.collections.libraries.find((library) => library.id === id) || null);
  }

  create(library) {
    return of({ id: uuidv4(), name: library.name, data: library.data })
      .pipe(mergeMap((lib) => {
        this.collections.libraries.push(lib);
        return of(lib);
      }));
  }


  update(data) {
    return of(this.collections.libraries.find((lib) => lib.id === data.id) || null)
      .pipe(
        mergeMap((lib) => {
          if (lib) {
            lib.archive.push(...data.archive);
            this.collections.libraries = this.collections.libraries.map((library) => ((library.id === lib.id) ? {
              ...library,
              ...data,
              archive: lib.archive,
            } : library));
            return of(this.collections.libraries);
          } return of(lib);
        }),
      );
  }


  delete(id) {
    return of(this.collections.libraries.find((lib) => lib.id === id) || null)
      .pipe(mergeMap((library) => {
        if (library === null) {
          return of(library);
        }
        return of(this.collections.libraries.splice(this.collections.libraries.indexOf(library), 1))
          .pipe(map((lib) => lib[0].id));
      }));
  }
}

module.exports = libraryRepository;
