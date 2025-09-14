import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
  SetMetadata,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Console, log } from 'console';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Validate } from 'class-validator';
import { Public } from 'src/common/decorators/public.decorators';
import { resolve } from 'path';
import { request } from 'http';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffeees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly CoffeesService: CoffeesService) {
    //      @Inject(REQUEST) private readonly request: Request,
    // ){
    //     console.log('CoffeesController created')
  }

  // //Response
  // findAll(@Res() response) {
  //   response.status(200).send ('This action is return all coffees');
  // }

// @ApiForbiddenResponse({description: 'Forbidden.'})
  @Public()
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    //  await new Promise(resolve => setTimeout(resolve, 5000));
    //  const {limit, offset} = paginationQuery;
    console.log(protocol);
    return this.CoffeesService.findAll(paginationQuery);
    //  return `This action return all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  //Route
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.CoffeesService.findOne('' + id);
    // return `This action return #${id} coffee`;
  }

  //Handling
  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeDto: CreateCoffeeDto) {
    // console.log(createCoffeDto instanceof CreateCoffeeDto);
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
