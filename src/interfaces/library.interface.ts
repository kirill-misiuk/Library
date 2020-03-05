import {Document} from 'mongoose'

export interface LibraryInterface extends Document {
    _id: string;
    name: string;
    archive: string[];
}

