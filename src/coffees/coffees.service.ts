import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffee = Coffee[''] = [
      {
        id:1,
        name:'Ali',
        brand:'buddy',
        flavors: ['chocolate', 'vanilla'],
      }  
    ];
    findAll(){
        return this.coffee;
    }

    findOne(id: string){
        
        const coffee = this.coffee.find(item => item.id === +id);
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;

    }

    create(createCoffeeDto : any){
        this.coffee.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: string, updateCoffeeDto: any){
        const existingCoffee = this.findOne(id);
        if(existingCoffee){
            //
        }
    }

    remove(id: string){
        const coffeeIndex = this.coffee.findIndex(item => item.id === +id);
        if(coffeeIndex >=0){
            this.coffee.splice(coffeeIndex, 1);
        }
    }
}
