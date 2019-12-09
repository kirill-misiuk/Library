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
    this.collections.libraries.find((library) => library.id === id);
    return of(this.collections.libraries);
  }

  create(library) {
    this.collections.libraries.push({ id: uuidv4(), name: library.name, data: [] });
    return of(this.collections.libraries.pop());
  }


  update(library) {
    this.collections.libraries.map((libraries) => library.find((o) => o.id === libraries.id) || libraries);
    return of(this.collections.libraries);
  }

  delete(id) {
    this.collections.libraries.filter((library) => this.collections.libraries.indexOf(library.id) === id);
    return id;
  }
}
module.exports = libraryRepository;
