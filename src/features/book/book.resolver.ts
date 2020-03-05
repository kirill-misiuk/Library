import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import {BookService} from "./book.service";
import { BookDto } from './dto/book.dto';
import { ParamsDto } from './dto/params.dto';
import { CreateDto } from './dto/create.dto';
import { Observable } from 'rxjs';
import { DeleteDto } from './dto/delete.dto';
import { UpdateDto } from './dto/update.dto';



@Resolver(BookDto)
export class BookResolver {
    constructor(
        private readonly bookService: BookService
    ) {
    }

    @Query(()=>[BookDto])
    books(@Args('params') params?: ParamsDto):Observable<any> {
        return this.bookService.getAllBooks(params)
    }

    @Query(()=>BookDto)
    book(@Args('_id') _id: string):Observable<any> {
        return this.bookService.getById(_id)
    }

    @Mutation(()=>CreateDto)
    createBook(@Args('book') book: CreateDto):Observable<any> {
        return this.bookService.createBook(book)
    }

    @Mutation(()=> DeleteDto)
    deleteBook(@Args('_id') _id: string[]):Observable<any> {
        return this.bookService.deleteBook(_id)
    }

    @Mutation(()=> UpdateDto)
    updateBook(@Args('book') book: UpdateDto):Observable<any> {
        return this.bookService.updateBook(book)
    }

    @Query(()=>[BookDto])
    getLibraryBooks(@Args() _id: string):Observable<any> {
        return this.bookService.getLibraryBooks(_id)
    }
}
