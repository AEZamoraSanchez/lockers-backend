import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list.entity";

export enum ListStatus {
     DONE = 'done',
     PENDING = 'pending',
   }


@Entity()
export class TaskList {

     @PrimaryGeneratedColumn('uuid')
     id : string;

     @Column()
     title: string;

     @Column()
     description: string;

     @Column()
     listId: string;

     @Column({
          type: 'enum',
          enum: ListStatus,
          default: ListStatus.PENDING,
        })
     status: ListStatus

     @ManyToOne( () => List, list => list.listTasks, { onDelete: 'CASCADE', eager: true })
     list : List;
}