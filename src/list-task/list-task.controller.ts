import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { createListTaskDto } from './dto/createTasks.dto';
import { updateListTaskDto } from './dto/updateListTaskDto.dto';
import { AuthGuard } from 'Guards/auth.guard';

@Controller('list-task')
export class ListTaskController {

     constructor(
          private _listTasksService: ListTaskService
     ){}

     @Get()
     @UseGuards(AuthGuard)
     getListsTasks(){
          return this._listTasksService.getListTasks()
     }

     @Get(':id')
     @UseGuards(AuthGuard)
     getListTaskById(@Param('id') id : string){
          return this._listTasksService.getListTaskById(id)
     }

     @Post()
     @UseGuards(AuthGuard)
     createListTask(@Body() taskList : createListTaskDto){
          return this._listTasksService.createListTask(taskList)
     }

     @Patch(':id')
     @UseGuards(AuthGuard)
     updateListTask(@Param('id') id : string, @Body() listTaskUpdate : updateListTaskDto){
          return this._listTasksService.updateListTask(id, listTaskUpdate)
     }

     @Delete(':id')
     @UseGuards(AuthGuard)
     deleteList(@Param('id') id : string){
          return this._listTasksService.deleteListTask(id)
     }
}
