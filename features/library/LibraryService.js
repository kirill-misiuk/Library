class LibraryService{
    constructor(LibraryRepository) {
        this.libraryRepository = LibraryRepository;
    }
    getAll(){
        return this.libraryRepository.getAll()
    }
    addNew(body){
        return this.libraryRepository.addNew(body);
    }
    getById(params){
        return this.libraryRepository.getById(params);
    }
}
module.exports = LibraryService;