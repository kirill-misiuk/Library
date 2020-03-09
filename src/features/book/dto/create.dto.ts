import { Field, Float, Int, ObjectType } from 'type-graphql';
import { CreateBookInput } from '../../../graphql/schemas/generated/graphql';

@ObjectType()
export class CreateDto implements CreateBookInput{
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
    @Field(()=> Int)
    year: number;
    @Field(()=> Float)
    price: number;

}
