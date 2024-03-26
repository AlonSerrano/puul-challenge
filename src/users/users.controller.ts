import { Controller, Get, Put, Param, Body, ParseIntPipe, Post, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(
        @Query('name') name?: string,
        @Query('email') email?: string,
        @Query('role') role?: string,
    ) {
        return this.usersService.findAll(name, email, role);
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

}
