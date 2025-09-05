// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { Coffee } from './entities/coffee.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
// import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

// @Injectable()
// export class CoffeesService {
//   constructor(
//     @InjectRepository(Coffee)
//     private readonly coffeeRepository: Repository<Coffee>,
//   ) {}
//   findAll() {
//     return this.coffeeRepository.find({
//       relations: ['flavors'],
//     });
//   }

//   async findOne(id: string) {
//     const coffee = await this.coffeeRepository.findOne({
//         where: {id: +id},
//         relations: ['flavors'],
//     });
//     if (!coffee) {
//       throw new NotFoundException(`Coffee #${id} not found`);
//     }
//     return coffee;
//   }

//   create(createCoffeeDto: CreateCoffeeDto) {
//     const coffee = this.coffeeRepository.create(createCoffeeDto);
//     return this.coffeeRepository.save(coffee);
//   }

//   async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
//     const coffee = await this.coffeeRepository.preload({
//       id: +id,
//       ...updateCoffeeDto,
//     });
//     if (!coffee) {
//       throw new NotFoundException(`Coffee #${id} no found`);
//     }
//     return this.coffeeRepository.save(coffee);
//   }

//   async remove(id: string) {
//   const coffee = await this.coffeeRepository.findOne({
//     where: { id: +id },
//   });

//   if (!coffee) {
//     throw new NotFoundException(`Coffee #${id} not found`);
//   }

//   return this.coffeeRepository.remove(coffee);
// }

// }
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';


@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const {limit , offset} = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} no found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
