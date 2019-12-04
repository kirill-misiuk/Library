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
    addNew(req,res){
        this.libraryService.addNew(req.body).subscribe({
            next: data  => res.status(201).json({status:201 , data}),
            error: error => res.status(400).json({status:400,data:{},error:error})
        });
    }
    getById(req,res){
        this.libraryService.getById(req.params.library_id).subscribe({
            next:  data  => res.status(200).json({status:200 , libraries:data}),
            error: error => res.status(400).json({status:400,data:{},error:error})
        });

    }

}
module.exports = LibraryController;