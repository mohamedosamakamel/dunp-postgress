import { Coffee } from 'src/coffees/entities/coffee.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors, {
    cascade: true,
  })
  coffees: Coffee[];

  @Column('int', { nullable: true })
  statistics: number;
}
