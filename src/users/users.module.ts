import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  TaskModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([User])]
})
export class UsersModule { }