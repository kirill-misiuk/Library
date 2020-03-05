import {ObjectType,Field,ID} from 'type-graphql';

import { Library } from '../../../graphql.schema';
@ObjectType()
export class LibraryDto extends Library{
    @Field(()=>ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
