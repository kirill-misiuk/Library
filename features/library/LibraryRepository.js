const { of } = require('rxjs');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const db = JSON.parse(fs.readFileSync('./repositories/libraries.json'));
class libraryRepository {
  constructor() {
    this.collections = db;
  }

  read() {
    return of(this.collections.libraries);
  }

  create(library) {
    this.collections.libraries.push({ id: uuidv4(), name: library.name, data: [] });
    return of(this.collections.libraries);
  }


  update(libraryID) {
    this.collections.libraries.find((library) => library.id === libraryID);
    return of(this.collections.libraries);
  }
}
module.exports = libraryRepository;
