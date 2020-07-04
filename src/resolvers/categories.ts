import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { createBaseResolver } from "../services/repository/BaseRepository";
import Person from "../entities/Person";
const persons: Person[] = [
  {
    id: 1,
    name: "Person 1",
    age: 23,
  },
  {
    id: 2,
    name: "Person 2",
    age: 23,
  },
];

@Resolver()
export class PersonResolver extends createBaseResolver(Person, persons) {
  //TODO: here you can implements specific mutations and you have access to generics methods
}
