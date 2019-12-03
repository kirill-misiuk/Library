const{Observable}= require('rxjs');
class libraryRepository{
    constructor(db) {
        this.db = db
    }
    getAll(){
        return new Observable((observer)=>{
            observer.next(this.db.libraries)
        })
    }
}
module.exports =libraryRepository;