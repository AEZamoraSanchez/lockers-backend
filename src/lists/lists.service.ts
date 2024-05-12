import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'Entitys/list.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createListDto } from './dto/createList.dto';
import { updateListDto } from './dto/updateList.dto';

@Injectable()
export class ListsService {

     constructor(
          @InjectRepository(List) private _listRepository: Repository<List>,
          private _userService: UserService
     ){}

     async createList ( locker : createListDto ){
          try{
               const user = this._userService.getUserById( locker.ownerId )

               if( !user ){
                    throw new NotFoundException('Not found')
               }

               const newLocker = this._listRepository.create(locker)
               const lockerSaved = await this._listRepository.save(newLocker)

               return lockerSaved
          }
          catch( error ){
               if ( error?.status == 404){
                    throw new NotFoundException('the user does not exist')
               }
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
                    where: { id : id }
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
                    where: { id : id }
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
