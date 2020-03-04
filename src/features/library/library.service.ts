import { Injectable } from '@nestjs/common';
import {LibraryRepository} from "./library.repository";
import { Observable } from 'rxjs';
import { FindInterface, LibraryInterface, UpdateInterface } from '../../interfaces/library.interface';
import { CreateLibraryInput } from '../../Inputs/create.library.input';
@Injectable()
export class LibraryService {
    constructor(
      private readonly libraryRepository: LibraryRepository
    ) {}

     hello(): string{
        return this.libraryRepository.hello()
      }

    getAllLibraries(input:FindInterface):Observable<any> {
        const{search,count,size}= input;
        return this.libraryRepository.find({ name: { $regex: search || '' } }, count,size);
    }

    createLibrary(library: CreateLibraryInput):Observable<any> {
        return this.libraryRepository.create(library);
    }

    getById(_id:string):Observable<any> {
        return this.libraryRepository.findOne({ _id }).pipe();
    }

    updateLibrary(input: UpdateInterface):Observable<any> {
        const {_id, archive,...library}= input;
        return this.libraryRepository.updateOne(
            { _id },
            { ...library, $push: { $each: { archive } } },
        );
    }

    deleteLibrary(_id:string|string[]) {
        return this.libraryRepository.delete(_id);
    }

    getLibraries(bookId:string):Observable<any> {
        return this.libraryRepository.find({ archive: { $all: [bookId] } });
    }


}
