let Book = require('./book.repository');

exports.getBooks =  function () {
    return new Promise((resolve, reject) => {
        let book = new Book();
        resolve(book.getBooks());
        reject('Error while Paginating Users')
    })

};