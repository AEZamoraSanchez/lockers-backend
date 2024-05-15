
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Module } from "./module.entity";

export enum ListStatus {
     DONE = 'done',
     PENDING = 'pending',
   }

@Entity('list')
export class List {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     title: string;

     @Column()
     description: string;

     @Column({
          type: 'enum',
          enum: ListStatus,
          default: ListStatus.PENDING,
        })
     status: ListStatus

     @Column({ nullable: true})
     ownerId ? : string;

     @Column({ nullable: true})
     moduleId ? : string;

     @ManyToOne( () => User, user => user.lists)
     owner: User;

     @ManyToOne( () => Module, module => module.lists, { onDelete: 'CASCADE', eager: true })
     module: Module;
}