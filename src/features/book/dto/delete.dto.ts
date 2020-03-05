import { ObjectType, Field, ID } from 'type-graphql';
import { Deleted } from '../../../graphql.schema';
@ObjectType()
export class DeleteDto extends  Deleted{
    @Field(()=> ID)
    _id: string;
}
