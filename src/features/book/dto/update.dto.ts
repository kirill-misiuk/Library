import { Field, Float, Int, ObjectType, ID, } from 'type-graphql';
import { UpdateBookInput } from '../../../graphql.schema';

@ObjectType()
export class UpdateDto extends UpdateBookInput{
    @Field(()=>ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=>[String])
    libraryIds: string[];
    @Field(()=> String)
    author: string;
    @Field(()=> Int)
    pageCount: number;
    @Field(()=> String)
    title: string;
    @Field(()=> Float)
    price: number;
}
