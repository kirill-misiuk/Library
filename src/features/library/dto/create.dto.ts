import { ObjectType, Field, ID } from 'type-graphql';
import  {CreateLibraryInput}  from '../../../graphql.schema';
@ObjectType()
export class CreateDto extends  CreateLibraryInput{
    @Field(()=> ID)
    _id?: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
