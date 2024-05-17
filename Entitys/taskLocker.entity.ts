import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Locker } from "./locker.entity";

@Entity()

export class TaskLocker {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     title: string;

     @Column()
     description: string;

     @Column()
     lockerId: string;

     @ManyToOne( () => Locker, locker => locker.lockerTasks)
     locker: Locker;
}