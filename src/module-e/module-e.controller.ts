import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ModuleEService } from './module-e.service';
import { createModuleDto } from './dto/createModule.dto';
import { updateModuleDto } from './dto/updateModule.dto';
import { AuthGuard } from 'Guards/auth.guard';

@Controller('module')
export class ModuleEController {
     constructor(
          private _moduleService : ModuleEService
     ) { }

     @Get()
     @UseGuards(AuthGuard)
     getModules() {
          return this._moduleService.getModules()
     }

     @Get(':id/:prop') 
     @UseGuards(AuthGuard)
     getModuleById ( @Param('id') id : string,  @Param('prop') prop : string){
          // console.log("prop:",prop)
          return this._moduleService.getModuleById(id, prop)
     }

     @Post()
     @UseGuards(AuthGuard)
     createModule( @Body() moduleE : createModuleDto){

          return this._moduleService.createModule(moduleE)
     }

     @Patch(':id')
     @UseGuards(AuthGuard)
     updateModule ( @Param('id') id : string, @Body() updateModule : updateModuleDto){
          return this._moduleService.updateModule( id, updateModule)
     }

     @Delete(':id')
     @UseGuards(AuthGuard)
     deleteModule(@Param('id') id : string ){
          return this._moduleService.deleteModule(id)
     }
}
