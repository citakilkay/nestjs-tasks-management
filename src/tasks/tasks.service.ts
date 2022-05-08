import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {
    }
    getAllTasks() : Task[] {
        return this.tasks;
    }

    async getTaskById(id: number) : Promise<Task> {
        const taskbyId = this.taskRepository.findOneById(id);
        if(taskbyId) {
            return taskbyId;
        }
        throw new NotFoundException();
    }

    getTasksWithFilters(filterDto : GetTaskFilterDto) : Task[] {
        const {status, search } = filterDto;
        if(search) {
            this.tasks.filter(i => i.title.includes(search) || i.description.includes(search));
        }
        return this.tasks;
    }

    async createTask(title: string, description: string) : Promise<Task> {
        var createdTask = this.taskRepository.create({title, description});
        return createdTask;
    }

    async deleteTask(id: number) : Promise<void> {
        var taskWillbeDeleted = await this.getTaskById(id); // task yoksa throw notfound exception
        const newTaskArray: Task[] = this.tasks.filter(i => i.id != id);
        if(newTaskArray.length != this.tasks.length) {
            this.tasks = newTaskArray;
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus) : Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return task;
    }
}
