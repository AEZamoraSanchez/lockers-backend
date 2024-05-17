import { Module } from '@nestjs/common';
import { LockersController } from './lockers.controller';
import { LockersService } from './lockers.service';
import { Locker } from 'Entitys/locker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ModuleEModule } from 'src/module-e/module-e.module';

@Module({
  imports: [TypeOrmModule.forFeature([Locker]), UserModule, ModuleEModule],
  controllers: [LockersController],
  providers: [LockersService],
  exports: [LockersService]
})
export class LockersModule {}
