const{Observable}= require('rxjs');
const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/libraries.json"));
class libraryRepository{
    constructor() {
        this.collections = db
    }
    getAll(){
        return new Observable((observer)=>{
            observer.next(this.collections.libraries)
        })
    }
}
module.exports =libraryRepository;