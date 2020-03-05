
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateLibraryInput {
    name: string;
    archive?: string[];
}

export class FindInput {
    search?: string;
    count?: number;
    size?: number;
}

export class UpdateLibraryInput {
    _id: string;
    name?: string;
    archive?: string[];
}

export class Book {
    _id?: string;
    name?: string;
    author?: string;
    pageCount?: number;
    year?: number;
    title?: string;
    price?: number;
}

export class Deleted {
    _id?: string;
}

export class Library {
    _id: string;
    name: string;
    archive?: string[];
}

export abstract class IMutation {
    abstract createLibrary(library?: CreateLibraryInput): Library | Promise<Library>;

    abstract updateLibrary(library?: UpdateLibraryInput): Library | Promise<Library>;

    abstract deleteLibrary(_id?: string[]): Deleted[] | Promise<Deleted[]>;
}

export abstract class IQuery {
    abstract libraries(params?: FindInput): Library[] | Promise<Library[]>;

    abstract library(_id?: string): Library | Promise<Library>;

    abstract getLibraries(_id?: string): Book[] | Promise<Book[]>;
}
