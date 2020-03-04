import { Field, ID, InputType} from 'type-graphql';
@InputType()
export class LibraryInput {
    @Field(()=> ID )
    _id: string;
    @Field(()=>String )
    name: string;
    @Field(()=> [String])
    archive: string[];
}
