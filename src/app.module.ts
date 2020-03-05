import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryModule } from './features/library/library.module';
import {GraphQLModule} from "@nestjs/graphql";
import { ConfigModule } from '@nestjs/config'




@Module({
  imports: [LibraryModule,
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
