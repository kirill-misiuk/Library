import * as mongoose from 'mongoose';

 export const librarySchema = new mongoose.Schema({
    name: { type: String, unique: true },
    about: String,
    archive: Array,
}, {
    versionKey: false,
});

