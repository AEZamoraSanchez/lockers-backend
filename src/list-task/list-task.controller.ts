import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { createListTaskDto } from './dto/createTasks.dto';
import { updateListTaskDto } from './dto/updateListTaskDto.dto';

@Controller('list-task')
export class ListTaskController {

     constructor(
          private _listTasksService: ListTaskService
     ){}

     @Get()
     getListsTasks(){
          return this._listTasksService.getListTasks()
     }

     @Get(':id')
     getListTaskById(@Param('id') id : string){
          return this._listTasksService.getListTaskById(id)
     }

     @Post()
     createListTask(@Body() taskList : createListTaskDto){
          return this._listTasksService.createListTask(taskList)
     }

     @Patch(':id')
     updateListTask(@Param('id') id : string, @Body() listTaskUpdate : updateListTaskDto){
          return this._listTasksService.updateListTask(id, listTaskUpdate)
     }

     @Delete(':id')
     deleteList(@Param('id') id : string){
          return this._listTasksService.deleteListTask(id)
     }
}
