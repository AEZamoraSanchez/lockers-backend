import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LockerTaskService } from './locker-task.service';
import { createLockerTaskDto } from './dto/createLockerTaskDto.dto';
import { updateLockerTaskDto } from './dto/updateLockerTaskDto.dto';

@Controller('locker-task')
export class LockerTaskController {

     constructor(
          private _lockerTasksService: LockerTaskService
     ){}

     @Get()
     getLockerTasks(){
          return this._lockerTasksService.getLockerTasks()
     }

     @Get(':id')
     getLockerTaskById(@Param('id') id : string){
          return this._lockerTasksService.getLockerTaskById(id)
     }

     @Post()
     createLockerTask(@Body() lockerTask : createLockerTaskDto){
          return this._lockerTasksService.createLockerTask(lockerTask)
     }

     @Patch(':id')
     updateLockerTask(@Param('id') id : string, @Body() lockerTaskUpdate : updateLockerTaskDto){
          return this._lockerTasksService.updateLockerTask(id, lockerTaskUpdate)
     }

     @Delete(':id')
     deleteLockerTask(@Param('id') id : string){
          return this._lockerTasksService.deleteLockerTask(id)
     }
}
