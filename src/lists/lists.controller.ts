import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { createListDto } from './dto/createList.dto';
import { updateListDto } from './dto/updateList.dto';
import { AuthGuard } from 'Guards/auth.guard';

@Controller('list')
export class ListsController {

     constructor(
          private _listService: ListsService
     ){}

     @Get()
     @UseGuards(AuthGuard)
     getListTasks(){
          return this._listService.getLists()
     }

     @Get(':id')
     @UseGuards(AuthGuard)
     getListTaskbyId(@Param('id') id : string){
          return this._listService.getListbyId(id)
     }

     @Post()
     @UseGuards(AuthGuard)
     createListTask(@Body() list : createListDto){
          return this._listService.createList(list)
     }

     @Patch(':id')
     @UseGuards(AuthGuard)
     updateListTask(@Param('id') id : string, @Body() listUpdate : updateListDto){
          return this._listService.updateList(id, listUpdate)
     }

     @Delete(':id')
     @UseGuards(AuthGuard)
     deleteListTask(@Param('id') id : string){
          return this._listService.deleteList(id)
     }
}
