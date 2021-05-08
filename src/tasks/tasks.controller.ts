import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation-pipes';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  GetTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  @Post()
  @UsePipes(ValidationPipe)
  CreateTask(@Body() CreateTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(CreateTaskDto);
  }
  @Get(`/:id`)
  GetTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Delete(`/:id`)
  DeleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }
  @Patch(`/:id/status`)
  updateTaskStatus(
    @Param('/id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
