import {ObjectType,Field,ID} from 'type-graphql';

import { Library } from '../../../graphql/schemas/generated/graphql';
@ObjectType()
export class LibraryDto implements Library{
    @Field(()=>ID)
    _id: string;
    @Field(()=>String)
    name: string;
    @Field(()=> [String])
    archive: string[];
}
