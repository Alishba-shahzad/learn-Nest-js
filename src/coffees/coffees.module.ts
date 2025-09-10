import { ConfigModule } from '@nestjs/config';
import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { CoffeeEvent } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Flavor } from './entities/flavor.entity/flavor.entity';

import { DataSource } from 'typeorm';


// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeeBrandsFactory{
//   create(){
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, CoffeeEvent]), ConfigModule], 
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // CoffeeBrandsFactory,
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.Node_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
    {
      provide: COFFEE_BRANDS,
     useFactory:() => ['buddy brew', 'nescafe'],
     scope: Scope.TRANSIENT,
  }
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
