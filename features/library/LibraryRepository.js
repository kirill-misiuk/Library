const { of } = require('rxjs');

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
    const newlibrary = { id: uuidv4(), name: library.name, data: library.data };
    this.collections.libraries.push(newlibrary);
    return of(newlibrary);
  }


  update(data) {
    const library = this.collections.libraries.find((lib) => lib.id === id) || null;
    if (library) {
      library.archive.push(...data.archive || []);
      return of({
        ...library,
        ...{
          name: data.name || library.name,
          archive: library.archive,
        },
      });
    }
    return of(null);
  }


  delete(id) {
    const library = this.collections.libraries.find((lib) => lib.id === id) || false;
    if (library) {
      this.collections.libraries.splice(this.collections.libraries.indexOf(library), 1);
      return of(library.id);
    }
    return of(null);
  }
}

module.exports = libraryRepository;
