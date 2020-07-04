export interface IRead<T> {
  find(): T[];
  findOne(id: number): T;
}
