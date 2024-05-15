import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
               if( !moduleE.moduleId && !moduleE.ownerId){
                    throw new Error('the moduleId or the ownerId are required')
               }

               if( moduleE?.ownerId){
                    const userFound = await this._userService.getUserById(moduleE?.ownerId)

                    if(!userFound){
                         throw new NotFoundException('the user does not exist')
                    }
               }

               if(moduleE?.moduleId){
                    const moduleFound = await this.getModuleById(moduleE?.moduleId)

                    if(!moduleFound) {
                         throw new NotFoundException('the module does not exist')
                    }
               }
               

               const newModule = this._moduleRepository.create(moduleE)
               const moduleSaved = await this._moduleRepository.save(newModule)
               
               return moduleSaved
          }
          catch(error){
               if ( error?.status == 404){
                    throw new NotFoundException(error.message)
               }
               throw new BadRequestException(error.message)
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
               const moduleE = await this._moduleRepository.find({
                   where:  { id: id },
                   relations: ['lists', 'lockers', 'modules']
               })

               if(!moduleE || moduleE.length <= 0){
                    throw new NotFoundException('Not Found')
               }

               console.log(moduleE)
               return moduleE
          }
          catch(error){
               if(error.status == 404){
                    throw new NotFoundException(error.message)
               }
               return error
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

     async deleteModule ( id : string ){
          try{
               const moduleFound = await this._moduleRepository.findOne({
                    where: { id : id }
               })

               if(!moduleFound){
                    throw new NotFoundException('Not Found')
               }

               const moduleDeleted = await this._moduleRepository.remove(moduleFound)

               return moduleDeleted
          }
          catch(error){
               if(error.status === 404){
                    throw new NotFoundException(error.message)
               }
               return (error)
          }
     }
}
