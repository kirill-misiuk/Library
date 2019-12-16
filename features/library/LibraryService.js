const { map, mergeMap, tap } = require('rxjs/operators');
const { of } = require('rxjs');

class LibraryService {
  constructor(LibraryRepository) {
    this.libraryRepository = LibraryRepository;
  }

  getAllLibraries() {
    return this.libraryRepository.find();
  }

  createLibrary(library) {
    return this.libraryRepository.create(library);
  }

  getById(id) {
    return this.libraryRepository.findOne(id).pipe(
    );
  }

  updateLibrary(data) {
    return this.libraryRepository.update(data).pipe(
      tap((library) => library === null ? library : library.archive.push(...data.archive || [])),
      mergeMap((library) => (library === null ? of(library) : of({ ...library, ...{ name: data.name || library.name, archive: library.archive } }))),
    );
  }

  //   if (library) {
  //     library.archive.push(...data.archive || []);
  //     return of({
  //       ...library,
  //       ...{
  //         name: data.name || library.name,
  //         archive: library.archive,
  //       },
  //     });
  //   }
  //   return of(null);
  deleteLibrary(id) {
    return this.libraryRepository.delete(id).pipe(
      mergeMap((library) => (library === null ? of(library)
        : of(this.libraryRepository.collections.libraries.splice(this.libraryRepository.collections.libraries.indexOf(library), 1)[0].id))),
    );
  }
}
module.exports = LibraryService;
