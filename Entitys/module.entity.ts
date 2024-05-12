import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Locker } from "./locker.entity";
import { User } from "./user.entity";
import { List } from "./list.entity";

@Entity('module')

export class Module {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     title: string;

     @Column()
     ownerId: string

     @OneToMany(() => Locker, locker => locker.module)
     lockers: Locker[];

     @OneToMany(() => List, list => list.module)
     lists: List[];

     @ManyToOne( () => User, user => user.modules)
     owner ? : User;


}