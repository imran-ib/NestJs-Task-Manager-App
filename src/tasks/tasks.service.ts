import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  async getTasks(getTaskFilter: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(getTaskFilter);
  }
  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(CreateTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const TaskExist = await this.taskRepository.findOneOrFail(id);
    if (!TaskExist) {
      throw new NotFoundException();
    }
    return TaskExist;
  }

  async deleteTaskById(id: number): Promise<void> {
    const Task = await this.taskRepository.delete(id);
    if (Task.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const Task = await this.getTaskById(id);
    Task.status = status;
    await Task.save();
    return Task;
  }
}
