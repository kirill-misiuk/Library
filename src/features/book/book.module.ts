import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import {BookRepository} from "./book.repository";

@Module({
  providers: [BookResolver, BookService,BookRepository]
})
export class BookModule {}
