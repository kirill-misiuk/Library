import { Field,Int ,InputType} from 'type-graphql';
@InputType()
export class FindInput {
    @Field(()=> String )
    search: string;
    @Field(()=>Int )
    count: number;
    @Field(()=> Int)
    size: number
}
