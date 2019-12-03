class LibraryService{
    constructor(LibraryRepository) {
        this.libraryRepository = LibraryRepository;
    }
    getAll(){
        return this.libraryRepository.getAll().pipe();
    }

}
module.exports = LibraryService;