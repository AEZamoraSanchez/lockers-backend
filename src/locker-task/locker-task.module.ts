import { Module } from '@nestjs/common';
import { LockerTaskService } from './locker-task.service';
import { LockerTaskController } from './locker-task.controller';
import { LockersModule } from 'src/lockers/lockers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLocker } from 'Entitys/taskLocker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLocker]), LockersModule],
  providers: [LockerTaskService],
  controllers: [LockerTaskController],
})
export class LockerTaskModule {}
