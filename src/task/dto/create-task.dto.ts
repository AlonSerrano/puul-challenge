import { IsArray, IsDateString, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum TaskStatus {
  ACTIVE = 'active',
  FINISHED = 'finished',
}

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
  
    @IsNotEmpty()
    @IsDecimal()
    cost: number;
  
    @IsNotEmpty()
    @IsNumber()
    estimatedHours: number;

    @IsNotEmpty()
    @IsDateString()
    dueDate: string;
  
    @IsArray()
    assignedUserIds: number[];
  }