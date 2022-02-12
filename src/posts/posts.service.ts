import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Connection } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private connection: Connection,
  ) {}
  async create(createPostDto: any) {
    const doc = await this.postRepository.createBase(createPostDto);
    return await this.commentRepository.createBase({
      comment: 'test',
      post: doc.id,
    });
  }

  async findAll() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const posts = await queryRunner.manager.find(Comment, {
        relations: ['post'],
      });
      await queryRunner.commitTransaction();
      return posts;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return await this.commentRepository.find({ relations: ['post'] });
  }

  async findOne(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      console.log('here');
      await queryRunner.manager.query(
        'insert into comment (comment,"postId") values (\'acid@\',1)',
      );

      console.log('after inserting');
      for (let i = 0; i < 100; i++) {
        await queryRunner.manager.find(Comment);
      }
      console.log('finish');
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('ERROR =>', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
