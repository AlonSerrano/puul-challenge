import { Task } from 'src/task/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @ManyToMany(() => Task, task => task.assignedUsers)
  tasks: Task[];
}