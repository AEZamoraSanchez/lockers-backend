import { TaskList } from './../Entitys/taskList.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entitys/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FacebookStrategy } from './auth/Stratergies/facebook.strategy';
import { GoogleStrategy } from './auth/Stratergies/google.strategy';
import { AuthModule } from './auth/auth.module';
import { LockersModule } from './lockers/lockers.module';
import { Locker } from '../Entitys/locker.entity';
import { List } from 'Entitys/list.entity';
import { ListsModule } from './lists/lists.module';
import { Module as ModuleE } from 'Entitys/module.entity';
import { ModuleEModule } from './module-e/module-e.module';
import { ListTaskModule } from './list-task/list-task.module';
import { TaskLocker } from 'Entitys/taskLocker.entity';
import { LockerTaskModule } from './locker-task/locker-task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Locker, List, ModuleE, TaskList, TaskLocker]), 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Locker, List, ModuleE, TaskList, TaskLocker],
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    // Modules
    UserModule,
    AuthModule,
    LockersModule,
    ListsModule,
    ModuleEModule,
    ListTaskModule,
    LockerTaskModule,
],
  controllers: [AppController],
  providers: [ FacebookStrategy, GoogleStrategy ],
})
export class AppModule {}
