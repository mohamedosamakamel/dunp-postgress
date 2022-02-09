import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
  ) {}
  async create(createPostDto: any) {
    const doc = await this.postRepository.createBase(createPostDto);
    return await this.commentRepository.createBase({
      comment: 'test',
      post: doc.id,
    });
  }

  async findAll() {
    return await this.commentRepository.find({ relations: ['post'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
