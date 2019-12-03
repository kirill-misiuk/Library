const {Observable} = require('rxjs');
class bookRepository {
    constructor(db) {
        this.collection = db;
    }

    getAll() {
        return new Observable((observer) => {
            observer.next(this.collection)
        })
    }
}

module.exports = bookRepository;