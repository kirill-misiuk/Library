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
    const library = this.collections.libraries.find((lib) => lib.id === id);
    return library ? of(library) : throwError('Can\t find library');
  }

  create(library) {
    const newlibrary = { id: uuidv4(), name: library.name, data: [] };
    this.collections.libraries.push(newlibrary);
    return of(newlibrary);
  }


  update(newLibrary, id) {
    const librariesID = this.collections.libraries.map((item) => item.id);
    const vgfdgd = this.collections.libraries.find((library) => library.id === id);
    const index = librariesID.indexOf(id);
    const fdf = { ...vgfdgd };
  }

  delete(id) {
    const librariesID = this.collections.libraries.map((item) => item.id);
    const index = librariesID.indexOf(id);
    this.collections.libraries.splice(index, 1);
    return of(librariesID[index]);
  }
}
module.exports = libraryRepository;
