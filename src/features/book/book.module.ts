import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import {BookRepository} from "./book.repository";
import {BookProvider} from "./book.provider";
import {DatabaseModule} from "../../database/database.module";

@Module({
  imports:[ DatabaseModule],
  providers: [BookResolver, BookService,BookRepository,...BookProvider]
})
export class BookModule {}
