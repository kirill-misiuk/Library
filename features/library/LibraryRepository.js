const { of ,throwError} = require('rxjs');
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
    return this.collections.libraries.find((library) => library.id === id) || throwError();
  }

  create(library) {
    const newlibrary = { id: uuidv4(), name: library.name, data: [] };
    this.collections.libraries.push(newlibrary);
    return of(newlibrary);
  }


  update(newLibrary) {
    this.collections.libraries.map((library) => newLibrary.find((o) => o.id === library.id) || library);
    return of(this.collections.libraries);
  }

  delete(id) {
    const deletedID = this.findOne(id).id;
    this.collections.libraries.splice(this.collections.libraries.findIndex(this.collections.libraries, (item) => item.id === id), 1);
    return of(deletedID);
  }
}
module.exports = libraryRepository;
