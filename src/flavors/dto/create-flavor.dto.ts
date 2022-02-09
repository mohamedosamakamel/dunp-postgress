import { Coffee } from 'src/coffees/entities/coffee.entity';

export class CreateFlavorDto {
  name: string;
  coffees: Coffee[];
}
