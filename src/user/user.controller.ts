import { Body, Controller, Delete, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser } from './dto/updateUser.dto'
import { AuthGuard } from 'Guards/auth.guard';

@Controller('user')
export class UserController {
     constructor(private readonly _userService: UserService) {}

     @Get()
     @UseGuards(AuthGuard)
     getUsers() {
          return this._userService.getUsers();
     }

     @Get(':id')
     @UseGuards(AuthGuard)
     getUser(@Param('id') id: string) {
          return this._userService.getUserById(id);
     }

     @Patch(':id')
     @UseGuards(AuthGuard)
     updateUser(@Param('id') id: string, @Body() user : UpdateUser) {
          return this._userService.updateUser(id, user);
     }
     
     @Delete(':id')
     @UseGuards(AuthGuard)
     deleteUser(@Param('id') id: string) {
          return this._userService.deleteUser(id);
     }

}
