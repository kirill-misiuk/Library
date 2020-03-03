import { Module } from '@nestjs/common';
import { LibraryResolver } from './library.resolver';
import { LibraryService } from './library.service';
import {LibraryRepository} from "./library.repository";

@Module({
  providers: [LibraryResolver, LibraryService,LibraryRepository]
})
export class LibraryModule {}
