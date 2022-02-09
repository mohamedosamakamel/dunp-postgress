import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { EntityRepository, FindConditions, FindOneOptions } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';

@EntityRepository(Comment)
export class CommentRepository extends BaseAbstractRepository<Comment> {}
