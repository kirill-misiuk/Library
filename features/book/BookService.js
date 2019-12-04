
class BookService {
    constructor(BookRepository,LibraryRepository) {
        this.bookRepository =  BookRepository;
        this.libraryRepository = LibraryRepository;
    }
    getAll() {
        return this.bookRepository.getAll();
    }
    addBook(req){
        let data;
        this.libraryRepository.getById(req.params.library_id).subscribe({
            next: res => data = res.archive.toString().split(',').push(id)
        });
        data.push(id);

        return this.bookRepository.addBook(req.body);
    }
}
module.exports =  BookService;
