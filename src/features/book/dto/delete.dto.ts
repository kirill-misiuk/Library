import { ObjectType, Field, ID } from 'type-graphql';
import { Deleted } from '../../../graphql/schemas/generated/graphql';
@ObjectType()
export class DeleteDto implements Deleted{
    @Field(()=> ID)
    _id: string;
}
