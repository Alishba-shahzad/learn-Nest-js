import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { log } from 'console';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly CoffeesService: CoffeesService){
    
  }
  @Get()
  // //Response
  // findAll(@Res() response) {
  //   response.status(200).send ('This action is return all coffees');
  // }
  findAll(@Query() paginationQuery: PaginationQueryDto) {
  //  const {limit, offset} = paginationQuery;
    return this.CoffeesService.findAll(paginationQuery)
  //  return `This action return all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  //Route
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    
    return this.CoffeesService.findOne('' + id);
    // return `This action return #${id} coffee`;
  }

  //Handling
  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeDto: CreateCoffeeDto) {
    console.log(createCoffeDto instanceof CreateCoffeeDto);
    return this.CoffeesService.create(createCoffeDto);
    // return `This action return #${id} coffee`
  }

  //Update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.CoffeesService.update(id, updateCoffeeDto);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CoffeesService.remove(id);
  }
}
