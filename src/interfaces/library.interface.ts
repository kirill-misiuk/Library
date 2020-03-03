import {Document} from 'mongoose'
export interface LibraryInterface extends Document {
    _id: string;
    name: string;
    author: string;
    pageCount: number;
    year: number;
    title: string;
    price: number
}
