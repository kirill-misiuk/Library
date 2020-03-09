import { ObjectType, Field, ID } from 'type-graphql';
import  {CreateLibraryInput}  from '../../../graphql/schemas/generated/graphql';
@ObjectType()
export class CreateDto implements  CreateLibraryInput{
    @Field(()=> ID)
    _id?: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
