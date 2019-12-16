const { of } = require('rxjs');
const { mergeMap, map, switchMap } = require('rxjs/operators');

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
    return of({ id: uuidv4(), name: library.name, data: library.data });
  }


  update(data) {
    return of(this.collections.libraries.find((lib) => lib.id === data.id) || null)
      .pipe(
        mergeMap((library) => of(library).pipe(mergeMap((lib) => of(
          this.collections.libraries.map((libraries) => (libraries === lib ? {
            id: lib.id,
            name: data.name || lib.name,
            archive: lib.archive,
          } : libraries)),
        ).pipe(
          mergeMap((libraries) => of(libraries))
        )))),
      );
  }


  delete(id) {
    return of(this.collections.libraries.find((lib) => lib.id === id) || null)
      .pipe(mergeMap((library) => (library === null ? of(library) : of(this.collections.libraries.splice(this.collections.libraries.indexOf(library), 1)))
        .pipe(
          mergeMap((lib) => (lib === null ? of(lib) : of(lib[0].id))),
        )));
  }
}

module.exports = libraryRepository;
