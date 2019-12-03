class LibraryController{
    constructor(LibraryService){
        this.libraryService = LibraryService;
    }
    getAll(req,res){
        this.libraryService.getAll().subscribe({
            next: data  => res.status(200).json({status:200 , data}),
            error: error => res.status(400).json({status:400,data:{},error:error})
        });
    }

}
module.exports = LibraryController;