import {librarySchema} from "../../database/schemas/library.shema";
import {Connecton} from 'mongoose'
export const LibraryProvider =[
    {
        provide:'LIBRARY_MODEL',
        useFactory: (connection : Connecton) => connection.model('Library',librarySchema),
        inject:['DATABASE_CONNECTION']
    }
];
