import * as mongoose from 'mongoose';

 export const bookSchema = new mongoose.Schema({
    name: { type: String },
    author: { type: String },
    pageCount: { type: Number },
    year: { type: Number },
    title: { type: String },
    price: { type: String },
}, {
    versionKey: false,
});

