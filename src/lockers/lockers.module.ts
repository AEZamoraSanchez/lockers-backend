import { Module } from '@nestjs/common';
import { LockersController } from './lockers.controller';
import { LockersService } from './lockers.service';
import { Locker } from 'Entitys/locker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Locker]), UserModule],
  controllers: [LockersController],
  providers: [LockersService]
})
export class LockersModule {}
