import {Document} from 'mongoose'

export interface LibraryInterface extends Document {
    _id: string;
    name: string;
    archive: string[];
}
export interface FindInterface {
    search: string;
    count: number;
    size: number;
}
export interface UpdateInterface {
    _id:string;
     archive:string[];
     library: object;
}
