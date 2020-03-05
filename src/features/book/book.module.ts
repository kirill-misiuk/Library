import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import {BookRepository} from "./book.repository";
import { DatabaseModule } from '../../database/database.module';
import { BookProvider } from './book.provider';
import { LibraryRepository } from '../library/library.repository';
import { LibraryProvider } from '../library/library.provider';

@Module({
  imports:[DatabaseModule],
  providers: [BookResolver, BookService,LibraryRepository,BookRepository,...BookProvider,...LibraryProvider]
})
export class BookModule {}
