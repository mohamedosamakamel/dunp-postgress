import { Module } from '@nestjs/common';
import { FlavorsService } from './flavors.service';
import { FlavorsController } from './flavors.controller';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { CoffeeRepository } from 'src/coffees/coffee.repository';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forFeature([Flavor, CoffeeRepository]),
  ],
  controllers: [FlavorsController],
  providers: [FlavorsService],
})
export class FlavorsModule {}
