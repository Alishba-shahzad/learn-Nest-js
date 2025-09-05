export class Coffee{
    
    id:number;
    @Column()
    name:string;
    @Column()
    brand:string;
    flavors:string[];

}
