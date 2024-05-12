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
     getLists(){
          return this._listService.getLists()
     }

     @Get(':id')
     getListbyId(@Param('id') id : string){
          return this._listService.getListbyId(id)
     }

     @Post()
     createList(@Body() locker : createListDto){
          return this._listService.createList(locker)
     }

     @Patch(':id')
     updateList(@Param('id') id : string, @Body() listUpdate : updateListDto){
          return this._listService.updateList(id, listUpdate)
     }

     @Delete(':id')
     deleteList(@Param('id') id : string){
          return this._listService.deleteList(id)
     }
}
