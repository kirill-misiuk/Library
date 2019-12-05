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
    return of(this.collections.libraries.push({ id: uuidv4(), name: library.name, data: [] }));
  }

  getById(id) {
    return of(this.collections.libraries.find((library) => library.id === id));
  }
}
module.exports = libraryRepository;
