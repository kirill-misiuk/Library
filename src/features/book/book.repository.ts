import { Injectable } from '@nestjs/common';
@Injectable()
export class BookRepository{

    hello(){
        return 'hello from book'
    }

}
