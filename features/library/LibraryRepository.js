const { of } = require('rxjs');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/libraries.json'));
class libraryRepository {
  constructor() {
    this.collections = db;
  }

  readAll() {
    return of(this.collections.libraries);
  }

  createLibrary(library) {
    this.collections.libraries.push({ id: uuidv4(), name: library.name, data: [] });
    fs.writeFileSync('./repositories/libraries.json', JSON.stringify(this.collections));
    return of(this.collections.libraries);
  }

  getById(id) {
    return of(this.collections.libraries.find((library) => library.id === id));
  }

  writeBookArchive(bookID, libraryID) {
    const libraries = this.collections.libraries.find((library) => library.id === libraryID);
    if (libraries !== undefined) {
      libraries.archive.push(bookID);
      fs.writeFileSync('./repositories/libraries.json', JSON.stringify(this.collections));
    }
  }
}
module.exports = libraryRepository;
