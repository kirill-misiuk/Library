import {bookSchema} from "../../database/schemas/book.schema";

import {Connection} from 'mongoose'
export const BookProvider =[
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: Connection)=> connection.model('Book',bookSchema),
        inject:['DATABASE_CONNECTION']
    }
];
