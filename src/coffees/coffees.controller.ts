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

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly CoffeesService: CoffeesService){
    
  }
  @Get()
  // //Response
  // findAll(@Res() response) {
  //   response.status(200).send ('This action is return all coffees');
  // }
  findAll(@Query() paginationQuery) {
  //  const {limit, offset} = paginationQuery;
    return this.CoffeesService.findAll()
  //  return `This action return all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  //Route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CoffeesService.findOne(id);
    // return `This action return #${id} coffee`;
  }

  //Handling
  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return this.CoffeesService.create(body);
    // return `This action return #${id} coffee`
  }

  //Update
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.CoffeesService.update(id,body);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CoffeesService.remove(id);
  }
}
