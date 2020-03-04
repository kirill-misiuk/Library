import {bookSchema} from "../../database/schemas/book.schema";
import {Connection} from 'mongoose'
export const BookProvider =[
    {
        provide: 'BOOK_MODEL',
        useFactory: (connection: Connection)=> {
            bookSchema.index({ name: 1, author: 1, year: 1 }, { unique: true });
            connection.model('Book',bookSchema)
        },
        inject:['DATABASE_CONNECTION']
    }
];
