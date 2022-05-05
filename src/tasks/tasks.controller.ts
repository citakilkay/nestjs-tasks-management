import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
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

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto) : Task[] {
        if(!Object.keys(filterDto).length) {
            return this.tasksService.getAllTasks();
        }
        return this.tasksService.getTasksWithFilters(filterDto);
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
