import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from 'Entitys/module.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createModuleDto } from './dto/createModule.dto';
import { updateModuleDto } from './dto/updateModule.dto';

@Injectable()
export class ModuleEService {

     constructor(
          @InjectRepository(Module) private _moduleRepository: Repository<Module>,
          private _userService: UserService
     ) {}

     async createModule( moduleE : createModuleDto){
          try{
               
               const user = await this._userService.getUserById(moduleE?.ownerId)
               
               if(!user){
                    throw new NotFoundException('Not Found')
               }

               const newModule = this._moduleRepository.create(moduleE)

               const moduleSaved = await this._moduleRepository.save(newModule)
               
               return moduleSaved
          }
          catch(error){
               if ( error?.status == 404){
                    throw new NotFoundException('the user does not exist')
               }
               console.error("error", error)
          }
     }

     async getModules () {
          try{
               const modules = await this._moduleRepository.find()

               if( modules.length <= 0 ){
                    throw new Error ('there are no modules in the database');
               }

               return modules
          }
          catch(error){
               throw new NotFoundException(error.message)
          }
     }

     async getModuleById ( id : string ){
          try{
               const moduleE = await this._moduleRepository.findOne({
                   where:  { id: id },
                   relations: ['lists', 'lockers']
               })

               if(!moduleE){
                    throw new NotFoundException('Not Found')
               }

               return moduleE
          }
          catch(error){
               throw new NotFoundException(error.message)
          }
     }

     async updateModule ( id : string, updateModule : updateModuleDto) {
          try{
               
               const moduleFound = await this._moduleRepository.findOne({
                    where: { id : id }
               })

               if(!moduleFound){
                    throw new NotFoundException('Not Found')
               }

               const moduleUpdated = this._moduleRepository.merge(moduleFound, updateModule)

               return moduleUpdated
          }
          catch(error){
               throw new NotFoundException(error.message)
          }
     }
}
