class LibraryService{
    constructor(LibraryRepository) {
        this.libraryRepository = LibraryRepository;
    }
    getAll(){
        return this.libraryRepository.getAll().pipe();
    }
    addNew(body){
        return this.libraryRepository.addNew(body);
    }
}
module.exports = LibraryService;