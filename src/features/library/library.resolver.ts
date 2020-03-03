import {Query, Resolver} from '@nestjs/graphql';
import {LibraryService} from "./library.service";

@Resolver('Library')
export class LibraryResolver {
    constructor(
        private readonly libraryService: LibraryService
    ) {}

    @Query(()=>String)
    library(): string{
        return this.libraryService.hello()
    }
}
