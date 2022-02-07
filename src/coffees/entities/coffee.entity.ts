import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  // array of values
  @Column('text', { array: true, nullable: true })
  paragraphs: string[];

  @Column({ type: 'jsonb', nullable: true })
  properties: {
    brand: string;
    engine: {
      count: number;
      authors: string[];
    };
  };

  @Column('jsonb', { nullable: true })
  questions: object[];
}
