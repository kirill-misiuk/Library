const {scan}=require('rxjs/operators');
class LibraryService{
    constructor(LibraryRepository) {
        this.libraryRepository = LibraryRepository;
    }
    getAll(){
        return this.libraryRepository.getAll().pipe();
    }
    addNew(req){
        return this.libraryRepository.addNew(req);
    }
}
module.exports = LibraryService;