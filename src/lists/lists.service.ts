import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'Entitys/list.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createListDto } from './dto/createList.dto';
import { updateListDto } from './dto/updateList.dto';
import { ModuleEService } from 'src/module-e/module-e.service';

@Injectable()
export class ListsService {

     constructor(
          @InjectRepository(List) private _listRepository: Repository<List>,
          private _userService: UserService,
          private _moduleService : ModuleEService
     ){}

     async createList ( list : createListDto ){
          try{
               if(list.ownerId){
                    const userFound = await this._userService.getUserById( list.ownerId )
                    if( !userFound ){
                         throw new NotFoundException('the user does not exist')
                    }
               }

               if( list.moduleId){
                    const moduleFound = await this._moduleService.getModuleById( list.moduleId, list?.propietario )
                    
                    if( !moduleFound ){
                         throw new NotFoundException('the module does not exist')
                    }
               }

               const newList = this._listRepository.create(list)
               const listSaved = await this._listRepository.save(newList)

               return listSaved
          }
          catch( error ){
               if ( error?.status == 404){
                    throw new NotFoundException('the user does not exist')
               }
               return error
          }
     }

     async getLists (){
          try {
               const allLists = await this._listRepository.find()

               if( allLists.length <= 0 ){
                    throw new Error ('there are no lists in the database');
               }

               return allLists
          }
          catch (error) {
               throw new NotFoundException(error.message);          }
     }

     async getListbyId ( id : string ) {
          try {
               const listFound = await this._listRepository.findOne({
                    where: { id : id },
                    relations: ['listTasks']
               })

               if(!listFound){
                    throw new NotFoundException('Not Found');
               }

               return listFound
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async updateList ( id : string, listUpdate : updateListDto){
          try {
               const listFound = await this._listRepository.findOne({
                    where: { id : id },
               })

               if(!listFound){
                    throw new NotFoundException('Not Found');
               }

               const listUpdated = this._listRepository.create({
                    ...listFound,
                    ...listUpdate,
               })

               return this._listRepository.save(listUpdated)
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async deleteList( id : string ){
          try {
               const listFound = await this._listRepository.findOne({
                    where: { id : id }
               })

               if(!listFound){
                    throw new NotFoundException('Not Found');
               }

               const listDeleted = await this._listRepository.remove(listFound)

               return listDeleted
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }


}
