
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Module } from "./module.entity";
import { TaskList } from "./taskList.entity";

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

     @Column({ nullable: true})
     ownerId ? : string;

     @Column({ nullable: true})
     moduleId ? : string;

     @ManyToOne( () => User, user => user.lists)
     owner: User;

     @ManyToOne( () => Module, module => module.lists, { onDelete: 'CASCADE', eager: true })
     module: Module;

     @OneToMany(() => TaskList, task => task.list)
     listTasks: TaskList[];
}