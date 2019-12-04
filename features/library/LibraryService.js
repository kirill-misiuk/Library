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
    getById(id){
        return this.libraryRepository.getById(id);
    }
}
module.exports = LibraryService;