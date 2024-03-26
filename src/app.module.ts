import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      username: 'testuser',
      password: 'yourpassword',
      database: 'puul_challenge',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // Not recommended for production
    }),
    UsersModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
