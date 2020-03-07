import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import {BookRepository} from "./book.repository";
import { BookProvider } from './book.provider';
import { DatabaseModule } from '../../database/database.module';
import { LibraryModule } from '../library/library.module';



@Module({
  imports:[DatabaseModule,LibraryModule],
  providers: [BookResolver, BookService,BookRepository,...BookProvider]
})
export class BookModule {}
