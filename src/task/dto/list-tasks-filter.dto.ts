import { IsOptional, IsString, IsDateString } from 'class-validator';

export class ListTasksFilterDto {
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  email?: string;
}