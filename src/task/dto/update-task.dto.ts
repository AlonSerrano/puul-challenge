import { IsOptional, IsString, IsDecimal, IsArray, IsDateString, IsEnum, IsNumber } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum({ active: 'active', finished: 'finished' })
  status?: string;

  @IsOptional()
  @IsDecimal()
  cost?: number;

  @IsOptional()
  @IsNumber()
  estimatedHours?: number;

  @IsOptional()
  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsArray()
  assignedUserIds?: number[];
}