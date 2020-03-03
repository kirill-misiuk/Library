import { Injectable } from '@nestjs/common';

@Injectable()
export class LibraryRepository{

   hello(){
    return 'hello from library'
   }

}
