import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlavorsService } from './flavors.service';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';

@Controller('flavors')
export class FlavorsController {
  constructor(private readonly flavorsService: FlavorsService) {}

  @Post()
  create(@Body() createFlavorDto: CreateFlavorDto) {
    return this.flavorsService.create(createFlavorDto);
  }

  @Get("/sql")
  testing() {
    return this.flavorsService.doSomeQuery();
  }

  @Get()
  findAll() {
    return this.flavorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flavorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlavorDto: UpdateFlavorDto) {
    return this.flavorsService.update(+id, updateFlavorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flavorsService.remove(+id);
  }
}
