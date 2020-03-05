import { Field, Float, Int, ObjectType, ID, } from 'type-graphql';
import { Book } from '../../../graphql.schema';

@ObjectType()
export class BookDto extends Book{
    @Field(()=>ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> String)
    author: string;
    @Field(()=> Int)
    pageCount: number;
    @Field(()=> String)
    title: string;
    @Field(()=> Float)
    price: number;
}
