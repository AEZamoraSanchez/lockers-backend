import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskLocker } from 'Entitys/taskLocker.entity';
import { createLockerDto } from 'src/lockers/dto/createLocker.dto';
import { LockersService } from 'src/lockers/lockers.service';
import { Repository } from 'typeorm';
import { createLockerTaskDto } from './dto/createLockerTaskDto.dto';
import { updateLockerTaskDto } from './dto/updateLockerTaskDto.dto';

@Injectable()
export class LockerTaskService {

     constructor(
          @InjectRepository(TaskLocker) private _lockerTasksRepository: Repository<TaskLocker>,
          private _lockerService : LockersService
     ) {}

     async createLockerTask ( lockerTask : createLockerTaskDto ){
          try{
                    const lockerFound = await this._lockerService?.getLockerById(lockerTask.lockerId);
                    if( !lockerFound ){
                         throw new NotFoundException('the Locker does not exist')
                    }
               

               const newLockerTask = this._lockerTasksRepository.create(lockerTask)
               const lockerTaskSaved = await this._lockerTasksRepository.save(newLockerTask)

               return lockerTaskSaved
          }
          catch( error ){
               if ( error?.status == 404){
                    throw new NotFoundException(error.message)
               }
               return error
          }
     }

     async getLockerTasks (){
          try {
               const allLockerTasks = await this._lockerTasksRepository.find()

               if( allLockerTasks.length <= 0 ){
                    throw new Error ('there are no locker-tasks in the database');
               }

               return allLockerTasks
          }
          catch (error) {
                    throw new NotFoundException(error.message);          
               }
     }

     async getLockerTaskById ( id : string ) {
          try {
               const lockerTaskFound = await this._lockerTasksRepository.findOne({
                    where: { id : id }
               })

               if(!lockerTaskFound){
                    throw new NotFoundException('Not Found');
               }

               return lockerTaskFound
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async updateLockerTask ( id : string, lockerTaskUpdate : updateLockerTaskDto){
          try {
               const lockerTaskFound = await this._lockerTasksRepository.findOne({
                    where: { id : id }
               })

               if(!lockerTaskFound){
                    throw new NotFoundException('Not Found');
               }

               const lockerTaskUpdated = this._lockerTasksRepository.create({
                    ...lockerTaskFound,
                    ...lockerTaskUpdate,
               })

               return this._lockerTasksRepository.save(lockerTaskUpdated)
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async deleteLockerTask( id : string ){
          try {
               const lockerTaskFound = await this._lockerTasksRepository.findOne({
                    where: { id : id }
               })

               if(!lockerTaskFound){
                    throw new NotFoundException('Not Found');
               }

               const lockerTaskDeleted = await this._lockerTasksRepository.remove(lockerTaskFound)

               return lockerTaskDeleted
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }
}
