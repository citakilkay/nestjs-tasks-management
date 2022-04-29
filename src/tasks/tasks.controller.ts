import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    private tasksService: TasksService;
    constructor(tasksService: TasksService) {
        this.tasksService = tasksService; // dependency injection
    }
    // helloWorld() {
    //         this.tasksService.getHello();
    // }
    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: number) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() input: CreateTaskDto) {
        return this.tasksService.createTask(input.title, input.description);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number) {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: number, @Body('status') status: TaskStatus) : Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
