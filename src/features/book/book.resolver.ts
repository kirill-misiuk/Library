import {Query, Resolver} from '@nestjs/graphql';
import {BookService} from "./book.service";

@Resolver('Book')
export class BookResolver {
    constructor(
        private readonly bookService: BookService
    ) {}

    @Query(()=>String)
    book(): string{
        return this.bookService.hello()
    }
}
