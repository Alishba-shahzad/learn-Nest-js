import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module'; // <-- use AppModule


describe('[Feature] Coffees - /coffees', () => {
    const coffee = {
        name: 'Alish naz',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla'],
    }
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'pass123',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
        }),
      ],   // <-- replace CoffeesModule with AppModule
    }).compile();


    app = moduleFixture.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
      );
    await app.init();
  });

  it('Create [Post /]', () => {

  });
  it.todo('Get all [Get /]');
  it.todo('Get one [Get /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
