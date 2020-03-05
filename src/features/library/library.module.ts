import { Module } from '@nestjs/common';
import { LibraryResolver } from './library.resolver';
import { LibraryService } from './library.service';
import {LibraryRepository} from "./library.repository";
import { LibraryProvider } from './library.provider';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports:[DatabaseModule],
  providers: [LibraryResolver, LibraryService,LibraryRepository,...LibraryProvider],
})
export class LibraryModule {}
