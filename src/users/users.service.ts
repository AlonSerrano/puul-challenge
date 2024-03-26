import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Task } from 'src/task/task.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user;
    }

    async findAll(name?: string, email?: string, role?: string): Promise<any[]> {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .leftJoin('user.tasks', 'task', 'task.status = :status', { status: 'finished' })
            .select('user.id', 'id')
            .addSelect('user.name', 'name')
            .addSelect('user.email', 'email')
            .addSelect('user.role', 'role')
            .addSelect('COUNT(task.id)', 'finishedTasksCount')
            .addSelect('SUM(task.cost)', 'totalTasksCost')
            .where('user.name ILIKE :name', { name: `%${name || ''}%` })
            .andWhere('user.email ILIKE :email', { email: `%${email || ''}%` })
            .andWhere('user.role ILIKE :role', { role: `%${role || ''}%` })
            .groupBy('user.id')
            .getRawMany();
    
        return users.map(user => ({
            ...user,
            finishedTasksCount: parseInt(user.finishedTasksCount, 10) || 0,
            totalTasksCost: parseFloat(user.totalTasksCost) || 0.0,
        }));
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.preload({
            id: userId,
            ...updateUserDto,
        });

        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return this.userRepository.save(user);
    }
}
