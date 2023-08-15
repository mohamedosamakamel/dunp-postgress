import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CoffeeRepository } from 'src/coffees/coffee.repository';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Connection, Repository } from 'typeorm';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class FlavorsService {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly coffeeService: CoffeesService,
    private readonly coffeeRepository: CoffeeRepository,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createFlavorDto: CreateFlavorDto) {
    const flavor = await this.flavorRepository.create(createFlavorDto);
    await this.flavorRepository.save(flavor);
    return flavor;
  }
  async doSomeQuery() {
    try {

      /*  const users = await this.connection.query('SELECT * FROM USERS;'); */
      const users = await this.connection.query("BACKUP DATABASE USERS ; ");
      console.log(users);
      return users;
    } catch(err){
      console.log(err)
    }
  }

  findAll() {
    return this.flavorRepository.find({ relations: ['coffees'] });
    // return this.coffeeRepository.findOneChild();
  }

  findOne(id: number) {
    return `This action returns a #${id} flavor`;
  }

  update(id: number, updateFlavorDto: UpdateFlavorDto) {
    return `This action updates a #${id} flavor`;
  }

  remove(id: number) {
    return `This action removes a #${id} flavor`;
  }
}
