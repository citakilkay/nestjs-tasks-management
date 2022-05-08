import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
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
    async getTaskById(@Param('id') id: number): Promise<any> {
        return await this.tasksService.getTaskById(id);
    }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto) {
        if(!Object.keys(filterDto).length) {
            return this.tasksService.getAllTasks();
        }
        return this.tasksService.getTasksWithFilters(filterDto);
    }

    @Post()
    async createTask(@Body() input: CreateTaskDto): Promise<any>  {
        const {title, description } = input;
        return await this.tasksService.createTask(title, description);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number) {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: number, @Body('status') status: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
