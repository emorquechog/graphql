import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
class Person {
    @Field()
    id: number;
  
    @Field()
    name: string;
  
    @Field(type => Int)
    age: number;
}

export default Person;