const { of, from } = require('rxjs');
const { mergeMap, map, toArray } = require('rxjs/operators');

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
            this.collections.libraries = this.collections.libraries.map((library) => ((library.id === lib.id) ? {
              ...library,
              ...data,
              archive: Array.from(new Set([...library.archive, ...(data.archive || [])])),
            } : library));
            return of(this.collections.libraries.find((libary) => libary.id === data.id) || null);
          }
          return of(lib);
        }),
      );
  }

  delete(ids) {
    return from(ids)
      .pipe(
        map((id) => this.collections.libraries.findIndex((lib) => lib.id === id)),
        mergeMap((index) => {
          if (index !== -1) {
            return of(this.collections.libraries.splice((index), 1));
          }
          return of(null);
        }),
        toArray(),
        map((libraries) => libraries.reduce((acc, v) => (v ? acc.concat(...v.map((l) => l.id)) : acc), [])),
      );
  }
}

module.exports = libraryRepository;
