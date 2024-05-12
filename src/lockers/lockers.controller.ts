import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createLockerDto } from './dto/createLocker.dto';
import { LockersService } from './lockers.service';
import { updateLockerDto } from './dto/updateLocker.dto';

@Controller('locker')
export class LockersController {

     constructor(
          private _lockersService: LockersService
     ){}

     @Post()
     createLocker(@Body() locker : createLockerDto ){
          return this._lockersService.createLocker(locker)
     }

     @Get()
     getLockers(){
          return this._lockersService.getLockers()
     }

     @Get(':id')
     getLockerById(@Param('id') id : string){
          return this._lockersService.getLockerById(id)
     }

     @Patch(':id')
     updateLocker(@Param('id') id : string, @Body() updateLocker : updateLockerDto){
          return this._lockersService.updateLocker( id, updateLocker)
     }

     @Delete(':id')
     deleteLocker(@Param('id') id : string ){
          return this._lockersService.deleteLocker(id)
     }
}
