import { Injectable } from '@nestjs/common';
import {LibraryRepository} from "./library.repository";
import { Observable } from 'rxjs';

import { FindDto } from './dto/find.dto';
import {  UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { tap } from 'rxjs/operators';

@Injectable()
export class LibraryService {
    constructor(
      private readonly libraryRepository: LibraryRepository
    ) {}

    getAllLibraries(input: FindDto):Observable<any> {
        const{search,count,size}= input;
        return this.libraryRepository.find({ name: { $regex: search || '' } }, count,size);
    }

    createLibrary(library: CreateDto):Observable<any> {
        return this.libraryRepository.create(library);
    }

    getById(_id: string):Observable<any> {
        return this.libraryRepository.findOne({ _id }).pipe();
    }

    updateLibrary(input: UpdateDto):Observable<any> {
        const {_id, archive,...library}= input;
        return this.libraryRepository.updateOne(
            { _id },
            { ...library, $push: { $each: { archive } } },
        );
    }

    deleteLibrary(_id:string[]) {
        return this.libraryRepository.delete(_id)
            .pipe(tap((res)=>console.log(res)))
    }

    getLibraries(bookId:string):Observable<any> {
        return this.libraryRepository.find({ archive: { $all: [bookId] } });
    }


}
