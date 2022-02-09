import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { EntityRepository, FindConditions, FindOneOptions } from 'typeorm';
import { Coffee } from './entities/coffee.entity';

@EntityRepository(Coffee)
export class CoffeeRepository extends BaseAbstractRepository<Coffee> {
  public async findOneChild(
    conditions?: FindConditions<Coffee>,
    options?: FindOneOptions<Coffee>,
  ): Promise<Coffee | undefined> {
    const doc = await this.findOne(conditions, options);
    return doc;
  }
}
