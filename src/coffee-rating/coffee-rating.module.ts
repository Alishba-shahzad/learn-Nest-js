import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';
import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   // 👈 apna postgres user likho
      password: 'pass123',    // 👈 jo password set kiya tha postgres install ke waqt
      
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
