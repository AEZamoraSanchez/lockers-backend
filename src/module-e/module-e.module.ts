import { Module } from '@nestjs/common';
import { ModuleEService } from './module-e.service';
import { ModuleEController } from './module-e.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as ModuleE} from 'Entitys/module.entity'
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleE]), UserModule],
  providers: [ModuleEService],
  controllers: [ModuleEController],
  exports: [ModuleEService]
})
export class ModuleEModule {}
