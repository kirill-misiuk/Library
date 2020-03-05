import { ObjectType, Field, ID } from 'type-graphql';
import { UpdateLibraryInput } from '../../../graphql.schema';

@ObjectType()
export class UpdateDto extends UpdateLibraryInput {
    @Field(()=> ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
