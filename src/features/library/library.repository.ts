import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Model } from 'mongoose';
import { map, mergeMap } from 'rxjs/operators';
import { LibraryInterface } from '../../interfaces/library.interface';
@Injectable()
export class LibraryRepository {
  constructor(
      @Inject('LIBRARY_MODEL')
    private readonly libraryModel: Model<LibraryInterface>,
  ) {
  }

  hello() {
    return 'hello from library';
  }

  find(options = {}, count?:number, size?:number):Observable<any> {
    return from(this.libraryModel.find(options).skip(size * (count - 1)).limit(size).lean()
      .exec());
  }

  findOne(options:object):Observable<any> {
    return from(this.libraryModel.findOne(options).lean().exec());
  }

  create(library:object):Observable<any> {
    return from(this.libraryModel.create({ ...library }));
  }

  updateOne(cond:object, update:object):Observable<any> {
    return from(this.libraryModel.updateOne(cond, update, { new: true }))
      .pipe(
        mergeMap(() => from(this.libraryModel.findOne(cond).lean().exec())),
      );
  }

  updateMany(cond:object, update:object):Observable<any> {
    return from(this.libraryModel.updateMany(cond, update, { new: true }))
      .pipe(
        mergeMap(() => from(this.libraryModel.find(cond).lean().exec())),
      );
  }

  delete(ids:string[]):Observable<any> {
    return from(this.libraryModel.find({ _id: { $in: ids } }, '_id').lean().exec()).pipe(
      mergeMap((libraries) => from(this.libraryModel.deleteMany({ _id: { $in: libraries } }).lean().exec())
        .pipe(map(() => libraries))),
    );
  }
}
