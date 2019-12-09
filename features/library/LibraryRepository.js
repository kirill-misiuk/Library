const { of, throwError } = require('rxjs');

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
 return of(this.collections.libraries.find((library) => library.id === id) || 0);

  }

  create(library) {
    const newlibrary = { id: uuidv4(), name: library.name, data: [] };
    this.collections.libraries.push(newlibrary);
    return of(newlibrary);
  }


  update(newLibrary, id) {
    const library = this.collections.libraries.find((library) => library.id === id);
    library.archive.push(...newLibrary.archive);
    const lib = {
      name: library.name,
      archive: library.archive,
    }
    return of(Object.assign(library || 0, lib));
  }

  delete(id) {
    const librariesID = this.collections.libraries.map((item) => item.id);
    const index = librariesID.indexOf(id);
    this.collections.libraries.splice(index, 1);
    return of(librariesID[index]);
  }
}
module.exports = libraryRepository;
