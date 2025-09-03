import { Flavor } from './flavor.entity/flavor.entity';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
@Entity('coffees')
export class Coffee{
    @PrimaryGeneratedColumn()
       id: number;
   
    @Column()
       name: string;
   
    @Column()
       brand: string;
   
    @JoinTable()
    @ManyToMany(
           type => Flavor,
           flavor => flavor.coffees,
       )
       flavor: string[];
}