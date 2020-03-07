import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import { ConfigModule } from '@nestjs/config'
import { BookModule } from './features/book/book.module';




@Module({
  imports: [BookModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
      ConfigModule.forRoot({

      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
