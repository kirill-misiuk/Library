import { ObjectType, Field, ID } from 'type-graphql';
import { UpdateLibraryInput } from '../../../graphql/schemas/generated/graphql';

@ObjectType()
export class UpdateDto implements UpdateLibraryInput {
    @Field(()=> ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
