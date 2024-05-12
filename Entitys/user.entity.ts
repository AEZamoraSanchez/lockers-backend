import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Locker } from "./locker.entity";
import { List } from "./list.entity";
import { Module } from "./module.entity";

@Entity()
export class User {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     username: string;

     @Column({
          unique: true
     })
     email: string;

     @Column()
     password: string;
     
     @OneToMany(() => Locker, locker => locker.owner)
     lockers: Locker[] 
     
     @OneToMany(() => List, list => list.owner)
     lists: List[]

     @OneToMany(() => Module, moduleE => moduleE.owner, { eager: true })
     modules: Module[]
}