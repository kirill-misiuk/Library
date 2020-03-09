import { ObjectType, Field,Int } from 'type-graphql';
import { FindInput } from '../../../graphql/schemas/generated/graphql';
@ObjectType()
export class ParamsDto implements FindInput{
    @Field(()=>String)
    search?: string;
    @Field(()=>Int)
    count?: number;
    @Field(()=> Int)
    size?: number
}
