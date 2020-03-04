import { Field, InputType} from 'type-graphql';
@InputType()
export class CreateLibraryInput {
    @Field(()=>String )
    name: string;
    @Field(()=> [String])
    archive: string[];
}
