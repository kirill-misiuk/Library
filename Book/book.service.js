let Book = require('./book.repository');
const {Observable} = require('rxjs');
const fs = require('fs');
const db = JSON.parse(fs.readFileSync("./repositories/books.json"));

exports.getAll = function () {
    let data = {};
    const book = new Book(db);
    const getData$ = new Observable((subject) => {
        subject.next(book.getAll())
    });
    getData$.subscribe({
        next: res=>data=res,
        error: null,
    });
    return data
};
exports.getOne = function (id) {
    const book = new Book(db);
    let data = {};
    const getData$ = new Observable((subject) => {
        subject.next(book.getOne(id));
        if(book.getOne(id)===undefined)subject.error('Not found');
    });
    getData$.subscribe({
        next: res => data = res,
        error: err => data=err
    });
    return data
};
exports.create= function (post) {
const book = new Book(db);
    let data = {};
    const postData$ = new Observable((subject) => {
        subject.next(book.create(post));
        console.log(post)
    });
    postData$.subscribe({
        next: res => data = res,
        error: err => data=err
    });
    return data
};