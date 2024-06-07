import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LockerTaskService } from './locker-task.service';
import { createLockerTaskDto } from './dto/createLockerTaskDto.dto';
import { updateLockerTaskDto } from './dto/updateLockerTaskDto.dto';
import { AuthGuard } from 'Guards/auth.guard';

@Controller('locker-task')
export class LockerTaskController {

     constructor(
          private _lockerTasksService: LockerTaskService
     ){}

     @Get()
     @UseGuards(AuthGuard)
     getLockerTasks(){
          return this._lockerTasksService.getLockerTasks()
     }

     @Get(':id')
     @UseGuards(AuthGuard)
     getLockerTaskById(@Param('id') id : string){
          return this._lockerTasksService.getLockerTaskById(id)
     }

     @Post()
     @UseGuards(AuthGuard)
     createLockerTask(@Body() lockerTask : createLockerTaskDto){
          return this._lockerTasksService.createLockerTask(lockerTask)
     }

     @Patch(':id')
     @UseGuards(AuthGuard)
     updateLockerTask(@Param('id') id : string, @Body() lockerTaskUpdate : updateLockerTaskDto){
          return this._lockerTasksService.updateLockerTask(id, lockerTaskUpdate)
     }

     @Delete(':id')
     @UseGuards(AuthGuard)
     deleteLockerTask(@Param('id') id : string){
          return this._lockerTasksService.deleteLockerTask(id)
     }
}
