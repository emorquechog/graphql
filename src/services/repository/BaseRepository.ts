// import all interfaces
import { Service } from "typedi";
import {
  Resolver,
  Mutation,
  Arg,
  Query,
  ClassType,
  Int,
  FieldResolver,
  Root,
  ArgsType,
  Field,
  Args,
} from "type-graphql";
import { ResourceServiceFactory, ResourceService } from "../resourceService";
import { Resource } from "../repository/interfaces/IResorce";
@ArgsType()
export class GetAllArgs {
  @Field((type) => Int)
  skip: number = 0;

  @Field((type) => Int)
  take: number = 10;
}
// that class only can be extended
export const createBaseResolver = <TResource extends Resource>(
  ResourceCls: ClassType,
  resources: TResource[]
) => {
  const suffix = ResourceCls.name.toLocaleLowerCase();
  @Resolver((of) => ResourceCls, { isAbstract: true })
  @Service()
  abstract class BaseRepository {
    protected resourceService: ResourceService<TResource>;

    constructor(factory: ResourceServiceFactory) {
      this.resourceService = factory.create(resources);
    }
    protected items: TResource[] = [];

    @Query((type) => ResourceCls, { name: `${suffix}` })
    async findOne(
      @Arg("personId", (type) => Int) personId: number
    ): Promise<TResource> {
      return this.resourceService.findOne(personId);
    }

    @Query((type) => [ResourceCls], { name: `${suffix}s` })
    protected async find(@Args() args: GetAllArgs) {
      return this.resourceService.find();
    }

    @Mutation((type) => [ResourceCls], { name: `${suffix}` })
    async create(@Arg("first", (type) => Int) id: TResource): Promise<boolean> {
      return this.resourceService.create(id);
    }

    @Mutation((type) => [ResourceCls], { name: `${suffix}` })
    async update(
      @Arg("first", (type) => Int) id: string,
      item: TResource
    ): Promise<boolean> {
      return this.resourceService.update(id);
    }

    @Mutation((type) => [ResourceCls], { name: `${suffix}` })
    async delete(@Arg("first", (type) => Int) id: string): Promise<boolean> {
      return this.resourceService.delete(id);
    }

    // dynamically created field with resolver for all child resource classes
    @FieldResolver({ name: "uuid" })
    protected getUuid(@Root() resource: Resource): string {
      return `${suffix}_${resource.id}`;
    }
  }

  return BaseRepository;
};
