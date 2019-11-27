class Book {
    constructor(db,repName) {
        this.collection = db
        this.repName = repName
    }

   getAll() {
        return this.collection
    }
    getOne(id) {
        return this.collection.books[id]
    }
    create(post){
const data= {
    "id":post.id,
    "name":post.name,
    "author":post.author,
    "year":post.year
}
this.collection.push(data);
        console.log(this.collection)
    }
}

module.exports = Book;