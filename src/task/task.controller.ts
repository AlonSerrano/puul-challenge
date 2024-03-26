import { Body, Controller, Post, Get, Query, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { ListTasksFilterDto } from './dto/list-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('task')
export class TaskController {
    constructor(private readonly tasksService: TaskService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    findAll(@Query() filterDto: ListTasksFilterDto) {
        return this.tasksService.findAll(filterDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.delete(id);
    }

    @Get('/analytics')
    getTasksAnalytics() {
      return this.tasksService.getTasksAnalytics();
    }
}
