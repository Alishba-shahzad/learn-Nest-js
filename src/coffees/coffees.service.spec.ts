import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository, ObjectLiteral } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import coffeesConfig from './config/coffees.config';
import e from 'express';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';


type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: createMockRepository() },
        { provide: getRepositoryToken(Flavor), useValue:  createMockRepository() },
        { provide: coffeesConfig.KEY, useValue: { foo: 'bar' } }, // 👈 mock config
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    describe('when coffee with ID exists', () =>{
      it('should return the coffee object', async()=>{
        const coffeeId = '1';
        //const expectedCoffee = {};

        if(coffeeRepository.findOne){
           coffeeRepository.findOne.mockReturnValue(undefined)
        }
       
        
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne?.mockReturnValue(undefined);

        try{
          await service.findOne(coffeeId);
         } catch (err){
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Coffee #${coffeeId} not found`)

          }
        
      })
    })
  })

});
