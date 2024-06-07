import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { createLockerDto } from './dto/createLocker.dto';
import { LockersService } from './lockers.service';
import { updateLockerDto } from './dto/updateLocker.dto';
import { AuthGuard } from 'Guards/auth.guard';

@Controller('locker')
export class LockersController {

     constructor(
          private _lockersService: LockersService
     ){}

     @Post()
     @UseGuards(AuthGuard)
     createLocker(@Body() locker : createLockerDto ){
          return this._lockersService.createLocker(locker)
     }

     @Get()
     @UseGuards(AuthGuard)
     getLockers(){
          return this._lockersService.getLockers()
     }

     @Get(':id')
     @UseGuards(AuthGuard)
     getLockerById(@Param('id') id : string){
          return this._lockersService.getLockerById(id)
     }

     @Patch(':id')
     @UseGuards(AuthGuard)
     updateLocker(@Param('id') id : string, @Body() updateLocker : updateLockerDto){
          return this._lockersService.updateLocker( id, updateLocker)
     }

     @Delete(':id')
     @UseGuards(AuthGuard)
     deleteLocker(@Param('id') id : string ){
          return this._lockersService.deleteLocker(id)
     }
}
