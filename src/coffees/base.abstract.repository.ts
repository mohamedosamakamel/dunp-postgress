import {
  DeepPartial,
  DeleteResult,
  EntityRepository,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Coffee } from './entities/coffee.entity';

export abstract class BaseAbstractRepository<
  Entity,
> extends Repository<Entity> {
  public async createBase(data: DeepPartial<Entity>): Promise<Entity> {
    const doc = await this.create(data);
    await this.save(doc);
    return doc;
  }
  public async findOneBase(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined> {
    const doc = await this.findOne(conditions, options);
    return doc;
  }
  public async deleteBase(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
  ): Promise<DeleteResult> {
    return await this.delete(criteria);
  }
  public async updateBase(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return await this.update(criteria, partialEntity);
  }
  public async findAllWithOptions(
    options?: FindManyOptions<Entity>,
  ): Promise<Entity[]> {
    return await this.find(options);
  }
  public async findAllWithConditions(
    conditions?: FindConditions<Entity>,
  ): Promise<Entity[]> {
    return await this.find(conditions);
  }
}
