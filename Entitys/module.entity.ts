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
     propietario: string;

     @Column({ nullable: true})
     ownerId: string

     @Column({ nullable: true})
     moduleId: string;

     @OneToMany(() => Locker, locker => locker.module, { cascade: true, onDelete : 'CASCADE' })
     lockers: Locker[];

     @OneToMany(() => List, list => list.module, { cascade: true, onDelete : 'CASCADE' })
     lists: List[];

     @ManyToOne( () => User, user => user.modules)
     owner ? : User;

     @OneToMany(() => Module, moduleE => moduleE.mainModule, { cascade: true})
     modules: Module[];

     @ManyToOne(() => Module, moduleE => moduleE.modules, { onDelete: 'CASCADE' })
     mainModule: Module;

}