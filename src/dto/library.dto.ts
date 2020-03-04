import {ObjectType,Field,ID} from 'type-graphql';

@ObjectType()
export class LibraryDto{
    @Field(()=>ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
