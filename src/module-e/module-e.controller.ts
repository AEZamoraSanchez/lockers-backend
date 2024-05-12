import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModuleEService } from './module-e.service';
import { createModuleDto } from './dto/createModule.dto';

@Controller('module')
export class ModuleEController {
     constructor(
          private _moduleService : ModuleEService
     ) { }

     @Get()
     getModules() {
          return this._moduleService.getModules()
     }

     @Get(':id')
     getModuleById ( @Param('id') id : string ){
          return this._moduleService.getModuleById(id)
     }

     @Post()
     createModule( @Body() moduleE : createModuleDto){

          return this._moduleService.createModule(moduleE)
     }
}
