import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeRepository } from './coffee.repository';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(private readonly _coffeeRepository: CoffeeRepository) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = await this._coffeeRepository.createBase(createCoffeeDto);
    return coffee;
  }

  findAll() {
    // return this._coffeeRepository.query(
    //   'SELECT * from coffee where $1 = ANY(paragraphs)',
    //   ['1'],
    // );
    // return this._coffeeRepository.findOneBase();
    // return this._coffeeRepository.find();
    return this._coffeeRepository.query(
      `SELECT * FROM coffee,jsonb_to_recordset(coffee.questions) as items(a int)
    left join post on post.id = a
    where coffee.id = $1 and a = $2
`,
      [20, 1],
    );
  }

  async findOne(id: number) {
    const coffee = await this._coffeeRepository.findOne({ id });
    if (!coffee) throw new NotFoundException(`coffee of id ${id} not found`);
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    await this._coffeeRepository.update(id, updateCoffeeDto);
    return;
  }

  async remove(id: number) {
    const deleteResponse = await this._coffeeRepository.delete(id);
    if (!deleteResponse.affected) throw new NotFoundException('post not found');
  }
}
