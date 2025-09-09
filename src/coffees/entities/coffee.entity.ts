import { Flavor } from './flavor.entity/flavor.entity';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('coffees')
export class Coffee{
    @PrimaryGeneratedColumn()
       id: number;
   
    @Column()
       name: string;

    @Column({nullable:true})
        description: string;
   
    @Column()
       brand: string;

    @Column({ default: 0} )
      recommendation: number;
   
    @JoinTable()
   
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, 
  })
  @JoinTable()
  flavors: Flavor[];  
}