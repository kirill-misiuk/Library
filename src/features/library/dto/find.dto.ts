import { ObjectType, Field,Int } from 'type-graphql';
import { FindInput } from '../../../graphql.schema';
@ObjectType()
export class FindDto extends FindInput{
    @Field(()=>String)
    search?: string;
    @Field(()=>Int)
    count?: number;
    @Field(()=> Int)
    size?: number
}
