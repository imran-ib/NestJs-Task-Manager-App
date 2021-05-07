import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  GetAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  CreateTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.tasksService.CreateTask(title, description);
  }
}
