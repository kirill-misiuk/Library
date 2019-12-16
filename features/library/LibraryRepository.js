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
    return of(this.collections.libraries.find((lib) => lib.id === data.id) || null);
  }


  delete(id) {
    return of(this.collections.libraries.find((lib) => lib.id === id) || null);
  }
}

module.exports = libraryRepository;
