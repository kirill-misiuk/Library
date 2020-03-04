import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {LibraryService} from "./library.service";
import { Observable } from 'rxjs';
import { LibraryInput } from '../../Inputs/library.input';
import { LibraryDto } from '../../dto/library.dto';
import { FindInput } from '../../Inputs/find.input';
import { CreateLibraryInput } from '../../Inputs/create.library.input';


@Resolver(LibraryDto)
export class LibraryResolver {
    constructor(
        private readonly libraryService: LibraryService
    ) {}

    @Query(()=>[LibraryDto])
    libraries(@Args('input') input:FindInput):Observable<any>{
    return this.libraryService.getAllLibraries(input)
    }
    @Mutation(()=>LibraryDto)
    createLibrary(@Args('library') library: CreateLibraryInput):Observable<any>{
     return this.libraryService.createLibrary(library)
    }
    @Query(()=>[LibraryDto])
    library(@Args('_id') _id:string):Observable<any>{
        return this.libraryService.getById(_id)
    }
}
