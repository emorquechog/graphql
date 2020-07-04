import { Service } from "typedi";
import { IWrite } from "./repository/interfaces/IWrite";
import { IRead } from "./repository/interfaces/IRead";
import { Resource } from "./repository/interfaces/IResorce";

// we need to use factory as we need separate instance of service for each generic
@Service()
export class ResourceServiceFactory {
  create<TResource extends Resource>(resources?: TResource[]) {
    return new ResourceService(resources);
  }
}

export class ResourceService<TResource extends Resource>
  implements IWrite<TResource>, IRead<TResource> {
  constructor(protected resources: TResource[] = []) {}
  findOne(id: number) {
    return this.resources[0];
  }
  find() {
    return this.resources;
  }
  create(item: TResource) {
    return true;
  }
  update(id: string) {
    return true;
  }
  delete(id: string) {
    return true;
  }
}
