import { BaseAbstractRepository } from 'src/coffees/base.abstract.repository';
import { EntityRepository, FindConditions, FindOneOptions } from 'typeorm';
import { Post } from './entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends BaseAbstractRepository<Post> {}
