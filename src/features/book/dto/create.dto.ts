import { Field, Float, Int, ObjectType } from 'type-graphql';
import { CreateBookInput } from '../../../graphql.schema';

@ObjectType()
export class CreateDto extends CreateBookInput{
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
