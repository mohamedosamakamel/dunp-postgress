import { ChildEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reply: number;
}
