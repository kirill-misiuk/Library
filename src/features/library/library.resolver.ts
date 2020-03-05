import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {LibraryService} from "./library.service";
import { Observable } from 'rxjs';
import { LibraryDto } from './dto/library.dto';
import { CreateDto } from './dto/create.dto';
import { FindDto } from './dto/find.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';

@Resolver(LibraryDto)
export class LibraryResolver {
    constructor(
        private readonly libraryService: LibraryService
    ) {}

    @Query(()=>[LibraryDto])
    libraries(@Args('params') params?: FindDto):Observable<any>{
    return this.libraryService.getAllLibraries(params)
    }
    @Mutation(()=>LibraryDto)
    createLibrary(@Args('library') library: CreateDto):Observable<any>{
     return this.libraryService.createLibrary(library)
    }
    @Query(()=>[LibraryDto])
    library(@Args('_id') _id: string ):Observable<any>{
        return this.libraryService.getById(_id)
    }
    @Mutation(()=>LibraryDto)
    updateLibrary(@Args('library') library: UpdateDto):Observable<any>{
        return this.libraryService.updateLibrary(library)
    }
    @Mutation(()=>[DeleteDto])
    deleteLibrary(@Args('_id') _id: string[]):Observable<any>{
        return  this.libraryService.deleteLibrary(_id)
    }
    @Query(()=>[LibraryDto])
    getLibraries(@Args('_id') _id: string):Observable<any>{
        return this.libraryService.getLibraries(_id)
    }
}
