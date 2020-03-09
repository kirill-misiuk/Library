import { Field, Float, Int, ObjectType, ID, } from 'type-graphql';
import { UpdateBookInput } from '../../../graphql/schemas/generated/graphql';

@ObjectType()
export class UpdateDto implements UpdateBookInput{
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
