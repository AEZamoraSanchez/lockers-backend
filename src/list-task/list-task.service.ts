import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from 'Entitys/taskList.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createListTaskDto } from './dto/createTasks.dto';
import { ListsService } from 'src/lists/lists.service';
import { updateListTaskDto } from './dto/updateListTaskDto.dto';

@Injectable()
export class ListTaskService {

     constructor (
          @InjectRepository(TaskList) private _listTasksRepository: Repository<TaskList>,
          private _listService : ListsService
     ){}

     async createListTask ( listTask : createListTaskDto ){
          try{
                    const listFound = await this._listService?.getListbyId(listTask.listId);
                    if( !listFound ){
                         throw new NotFoundException('the List does not exist')
                    }
               

               const newListTask = this._listTasksRepository.create(listTask)
               const listTaskSaved = await this._listTasksRepository.save(newListTask)

               return listTaskSaved
          }
          catch( error ){
               if ( error?.status == 404){
                    throw new NotFoundException(error.message)
               }
               return error
          }
     }

     async getListTasks (){
          try {
               const allListTasks = await this._listTasksRepository.find()

               if( allListTasks.length <= 0 ){
                    throw new Error ('there are no lists-tasks in the database');
               }

               return allListTasks
          }
          catch (error) {
                    throw new NotFoundException(error.message);          
               }
     }

     async getListTaskById ( id : string ) {
          try {
               const listTaskFound = await this._listTasksRepository.findOne({
                    where: { id : id }
               })

               if(!listTaskFound){
                    throw new NotFoundException('Not Found');
               }

               return listTaskFound
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async updateListTask ( id : string, listTaskUpdate : updateListTaskDto){
          try {
               const listTaskFound = await this._listTasksRepository.findOne({
                    where: { id : id }
               })

               if(!listTaskFound){
                    throw new NotFoundException('Not Found');
               }

               const listTaskUpdated = this._listTasksRepository.create({
                    ...listTaskFound,
                    ...listTaskUpdate,
               })

               return this._listTasksRepository.save(listTaskUpdated)
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async deleteListTask( id : string ){
          try {
               const listTaskFound = await this._listTasksRepository.findOne({
                    where: { id : id }
               })

               if(!listTaskFound){
                    throw new NotFoundException('Not Found');
               }

               const listTaskDeleted = await this._listTasksRepository.remove(listTaskFound)

               return listTaskDeleted
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

}
