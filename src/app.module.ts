import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryModule } from './features/library/library.module';
import { BookModule } from './features/book/book.module';
import {GraphQLModule} from "@nestjs/graphql";
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [LibraryModule, BookModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
      ConfigModule.forRoot({

      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
