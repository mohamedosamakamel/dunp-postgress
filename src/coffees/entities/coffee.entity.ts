import { Exclude, Transform } from 'class-transformer';
import { Flavor } from 'src/flavors/entities/flavor.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  // @Exclude()
  @Transform((value) => 'remah')
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

  @Column('jsonb', { nullable: true })
  test1: object[]; // no creation if syncronize:false

  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees)
  flavors: Flavor[];
}
