import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTasksFilterDto } from './dto/list-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  [x: string]: any;
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }


  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(filters: ListTasksFilterDto): Promise<Task[]> {
    const { dueDate, title, userName, email } = filters;

    const query = this.taskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.assignedUsers', 'user')
      .orderBy('task.id', 'DESC');

    if (dueDate) {
      query.andWhere('task.dueDate = :dueDate', { dueDate });
    }

    if (title) {
      query.andWhere('task.title ILIKE :title', { title: `%${title}%` });
    }

    if (userName) {
      query.andWhere('user.name ILIKE :userName', { userName: `%${userName}%` });
    }

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    return query.getMany();
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { assignedUserIds, ...taskUpdateData } = updateTaskDto;
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['assignedUsers'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${taskId}" not found.`);
    }

    Object.assign(task, taskUpdateData);

    if (assignedUserIds) {
      task.assignedUsers = await this.usersRepository.findByIds(assignedUserIds);
    }

    await this.taskRepository.save(task);

    return task;
  }

  async delete(taskId: number): Promise<void> {
    const result = await this.taskRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${taskId}" not found.`);
    }
  }

  async getTasksAnalytics(): Promise<any> {
    // Para saber cuantas tareas estan activas y cuantas terminadas
    const tasksCountByStatus = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('task.status')
      .getRawMany();

    //Top 5 de tareas mas complicadas por número de horas
    const topComplexTasks = await this.taskRepository
      .createQueryBuilder('task')
      .orderBy('task.estimatedHours', 'DESC')
      .limit(5)
      .getMany();

    return { tasksCountByStatus, topComplexTasks };
  }
}
