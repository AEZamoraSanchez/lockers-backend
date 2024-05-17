import { Module } from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { ListTaskController } from './list-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from 'Entitys/taskList.entity';
import { UserModule } from '../user/user.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList]), ListsModule],
  providers: [ListTaskService],
  controllers: [ListTaskController]
})
export class ListTaskModule {}
