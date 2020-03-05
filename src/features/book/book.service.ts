import { Injectable } from '@nestjs/common';
import {BookRepository} from "./book.repository";
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LibraryRepository } from '../library/library.repository';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { ParamsDto } from './dto/params.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly libraryRepository: LibraryRepository
    ) {}
    getAllBooks(params:ParamsDto):Observable<any> {
        const{search,count,size}= params;
        return this.bookRepository.find({ $or: [{ name: { $regex: search || '' } }, { $where: `/^${search}.*/.test(this.year)` }] }, count, size);
    }

    getById(_id:string):Observable<any> {
        return this.bookRepository.findOne({ _id });
    }

    createBook(newBook:CreateDto):Observable<any> {
        return this.bookRepository.create(newBook).pipe(
            mergeMap((book) => (
                newBook.libraryIds && newBook.libraryIds.length && this.libraryRepository.updateMany(
                { _id: { $in: newBook.libraryIds } },
                { $push: { archive: book._id } },
                ).pipe(map(() => book))
                || of(book))),
        );
    }

    deleteBook(id):Observable<any> {
        return this.bookRepository.delete(id);
    }

    updateBook(editBook:UpdateDto):Observable<any> {
        return this.bookRepository.update(editBook).pipe(
            mergeMap((book: BookDto) => (
                editBook.libraryIds && editBook.libraryIds.length && this.libraryRepository.updateMany(
                { _id: { $in: editBook.libraryIds } },
                { $addToSet: { archive: book._id } },
                ).pipe(map(() => book))
                || of(book))),
        );
    }

    getLibraryBooks(_id:string):Observable<any> {
        return this.libraryRepository.findOne({ _id }).pipe(
            mergeMap((foundLibrary) => {
                if (foundLibrary) {
                    return from(this.bookRepository.find({ _id: { $in: foundLibrary.archive } }));
                }
                return of(null);
            }),
        );
    }

}
