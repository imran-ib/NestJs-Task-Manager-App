import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskFilter(filterDto: GetTaskFilterDto): Task[] {
    const { searchTerm, status } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = this.tasks.filter((t) => t.status === status);
    }
    if (searchTerm) {
      tasks = this.tasks.filter((t) => {
        t.description.includes(searchTerm) || t.title.includes(searchTerm);
      });
    }
    return tasks;
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;

    const task: Task = {
      id: uuid.v4(),
      description,
      title,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const TaskExist = this.tasks.find((t) => t.id === id);

    if (!TaskExist) {
      throw new NotFoundException();
    }
    return TaskExist;
  }

  deleteTaskById(id: string): void {
    const Task = this.getTaskById(id);
    this.tasks = this.tasks.filter((t) => t.id !== Task.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const Task = this.getTaskById(id);
    console.log(
      '🚀 ~ file: tasks.service.ts ~ line 37 ~ TasksService ~ updateTaskStatus ~ Task',
      Task,
    );
    Task.status = status;
    return Task;
  }
}
