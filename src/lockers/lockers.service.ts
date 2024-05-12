import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locker } from 'Entitys/locker.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createLockerDto } from './dto/createLocker.dto';
import { updateLockerDto } from './dto/updateLocker.dto';

@Injectable()
export class LockersService {

     constructor(
          @InjectRepository(Locker) private _lockerRepository: Repository<Locker>,
          private _userService: UserService
     ){}

     async createLocker ( locker : createLockerDto ){
          try{
               const user = this._userService.getUserById( locker.ownerId )

               if( !user ){
                    throw new NotFoundException('Not found')
               }

               const newLocker = this._lockerRepository.create(locker)
               const lockerSaved = await this._lockerRepository.save(newLocker)

               return lockerSaved
          }
          catch( error ){
               if ( error?.status == 404){
                    throw new NotFoundException('the user does not exist')
               }
          }

     }

     async getLockers (){
          try {
               const allLockers = await this._lockerRepository.find()

               if( allLockers.length <= 0 ){
                    throw new Error ('there are no lockers in the database');
               }

               return allLockers
          }
          catch (error) {
               throw new NotFoundException(error.message);          }
     }

     async getLockerById ( id : string){
          try {
               const lockerFound = await this._lockerRepository.findOne({
                    where : { id : id }
               })

               if(!lockerFound){
                    throw new NotFoundException('Not Found');
               }

               return lockerFound
          
0          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async updateLocker ( id : string, updateLocker : updateLockerDto){
          try {
               const lockerFound = await this._lockerRepository.findOne({
                    where : { id : id }
               })

               if(!lockerFound){
                    throw new NotFoundException('Not Found');
               }

               const updatedLocker = this._lockerRepository.create({
                    ...lockerFound,
                    ...updateLocker,
                  });

               const lockerSaved = this._lockerRepository.save(updatedLocker)

               return lockerSaved
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async deleteLocker ( id : string ) {
          const lockerFound = await this._lockerRepository.findOne({
               where : { id : id }
          })

          if(!lockerFound){
               throw new NotFoundException('Not Found');
          }

          const lockerDeleted = await this._lockerRepository.remove(lockerFound)

          return lockerDeleted
     }
}
