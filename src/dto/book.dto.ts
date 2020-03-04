import {ObjectType,Field,ID} from 'type-graphql';

@ObjectType()
export class BookDto{
    @Field(()=>ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> String)
    author: string;
    @Field(()=>Number)
    pageCount: number;
    @Field(()=>Number)
    year: number;
    @Field(()=> String)
    title: string;
    @Field(()=>Number)
    price: number;
}
