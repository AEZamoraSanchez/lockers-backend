import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Module } from "./module.entity";
import { TaskLocker } from "./taskLocker.entity";


@Entity('locker')
export class Locker {

     @PrimaryGeneratedColumn('uuid')
     id: string

     @Column()
     title: string

     @Column()
     description: string

     @Column({ nullable: true })
     ownerId ? : string

     @Column({ nullable: true })
     moduleId ? : string

     @ManyToOne( () => User, user => user.lockers)
     owner: User
     
     @ManyToOne( () => Module, module => module.lockers, { onDelete: 'CASCADE', eager: true })
     module: Module;

     @OneToMany(() => TaskLocker, tasks => tasks.locker, { cascade: true, onDelete : 'CASCADE' })
     lockerTasks: TaskLocker[]
}