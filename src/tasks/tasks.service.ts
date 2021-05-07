import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  CreateTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid.v4(),
      description,
      title,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
