import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = await this.coffeeRepository.create(createCoffeeDto);
    await this.coffeeRepository.save(coffee);
    return coffee;
  }

  findAll() {
    return this.coffeeRepository.query(
      'SELECT * from coffee where $1 = ANY(paragraphs)',
      ['1'],
    );
    // return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) throw new NotFoundException(`coffee of id ${id} not found`);
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    await this.coffeeRepository.update(id, updateCoffeeDto);
    return;
  }

  async remove(id: number) {
    const deleteResponse = await this.coffeeRepository.delete(id);
    if (!deleteResponse.affected) throw new NotFoundException('post not found');
  }
}
