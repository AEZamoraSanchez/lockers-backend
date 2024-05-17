import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListsService } from './lists.service';
import { createListDto } from './dto/createList.dto';
import { updateListDto } from './dto/updateList.dto';

@Controller('list')
export class ListsController {

     constructor(
          private _listService: ListsService
     ){}

     @Get()
     getListTasks(){
          return this._listService.getLists()
     }

     @Get(':id')
     getListTaskbyId(@Param('id') id : string){
          return this._listService.getListbyId(id)
     }

     @Post()
     createListTask(@Body() list : createListDto){
          return this._listService.createList(list)
     }

     @Patch(':id')
     updateListTask(@Param('id') id : string, @Body() listUpdate : updateListDto){
          return this._listService.updateList(id, listUpdate)
     }

     @Delete(':id')
     deleteListTask(@Param('id') id : string){
          return this._listService.deleteList(id)
     }
}
