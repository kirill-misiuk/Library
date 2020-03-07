import { Inject, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {Model} from 'mongoose'
import { BookInterface } from '../../interfaces/book.interface';
import { CreateDto } from './dto/create.dto';
@Injectable()
export class BookRepository{
    constructor(
        @Inject('BOOK_MODEL')
        private readonly bookModel: Model<BookInterface>,
    ) {}
    find(options: object, count?:number, size?: number):Observable<any> {
        return from(this.bookModel.find(options).skip(size * (count - 1)).limit(size).lean()
            .exec());
    }

    findOne(options:object):Observable<any> {
        return from(this.bookModel.findOne(options).lean().exec());
    }

    create(book:CreateDto):Observable<any> {
        const { libraryIds, ...Newbook } = book;
        return from(this.bookModel.create({ ...Newbook }));
    }


    update(data) {
        return from(this.bookModel.findOne({ _id: data._id }).lean().exec())
            .pipe(mergeMap((foundLibrary) => {
                if (foundLibrary) {
                    return from(this.bookModel.findByIdAndUpdate(data._id, { ...data }, { new: true }));
                }
                return of(foundLibrary);
            }));
    }

    delete(ids) {
        return from(this.bookModel.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
            mergeMap((books) => from(this.bookModel.deleteMany({ _id: { $in: books } }).lean().exec())
                .pipe(map(() => books))),
        );
    }
}
