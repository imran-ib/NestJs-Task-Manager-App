import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatus } from './task-status-enum';
import { TaskRepository } from './task.repository';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(getTaskFilter: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(getTaskFilter, user);
  }
  async createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const TaskExist = await this.taskRepository.findOneOrFail({
      where: { id, userId: user.id },
    });
    if (!TaskExist) {
      throw new NotFoundException();
    }
    return TaskExist;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const Task = await this.taskRepository.delete({ id, userId: user.id });
    if (Task.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const Task = await this.getTaskById(id, user);
    Task.status = status;
    await Task.save();
    return Task;
  }
}
