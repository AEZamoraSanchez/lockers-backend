import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';

import { List } from 'Entitys/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ModuleEModule } from 'src/module-e/module-e.module';
2

@Module({
  imports: [TypeOrmModule.forFeature([List]), UserModule, ModuleEModule],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService]
})
export class ListsModule {}
