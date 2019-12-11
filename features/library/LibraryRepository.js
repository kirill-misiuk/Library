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
    const newlibrary = { id: uuidv4(), name: library.name, data: [] };
    this.collections.libraries.push(newlibrary);
    return of(newlibrary);
  }


  update(newLibrary, id) {
    const library = this.collections.libraries.find((lib) => lib.id === id) || false;
    if (library) {
      library.archive.push(...newLibrary[0].archive || []);
      const j = Object.assign(library, {
        name: newLibrary[0].name || library.name,
        archive: library.archive,
      });
      return of(j);
    }
    return of(null);
  }


  delete(id) {
    const librariesID = this.collections.libraries.map((item) => item.id);
    const index = librariesID.indexOf(id);
    this.collections.libraries.splice(index, 1);
    return index !== -1 ? of(librariesID[index]) : of(null);
  }
}

module.exports = libraryRepository;
