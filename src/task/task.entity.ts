import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  status: string; // Ejemplo: 'active', 'finished'

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('float')
  estimatedHours: number;

  @Column()
  dueDate: Date;

  @ManyToMany(() => User, user => user.tasks)
  @JoinTable()
  assignedUsers: User[];
}