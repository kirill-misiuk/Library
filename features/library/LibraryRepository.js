const{Observable}= require('rxjs');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const db = JSON.parse(fs.readFileSync('./repositories/libraries.json'));
class libraryRepository{
    constructor() {
        this.collections = db;
    }
    getAll(){
        return new Observable((observer)=>{
            observer.next(this.collections.libraries);
        });
    }
    addNew(body){
        this.collections.libraries.push({id:uuidv4(),name:body.name,data:['43443']});
        return new Observable((observer)=>{
            observer.next(this.collections.libraries);
        });
    }
    getById(id){
        return new Observable((observer)=>{
            observer.next(this.collections.libraries.find((obj)=>obj.id===id));
        });
    }
}
module.exports =libraryRepository;