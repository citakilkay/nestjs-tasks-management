import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTaskById(id: number) : Task {
        const taskbyId = this.tasks.find(i => i.id == id);
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

    createTask(title: string, description: string) : Task {
        const task: Task = {
            id: 2,
            title,
            description,
            status: TaskStatus.Open
        }
        this.tasks.push(task);
        console.log(this.tasks);
        return task;
    }

    deleteTask(id: number) : void {
        this.getTaskById(id);
        const newTaskArray: Task[] = this.tasks.filter(i => i.id != id);
        if(newTaskArray.length != this.tasks.length) {
            this.tasks = newTaskArray;
        }
    }

    updateTaskStatus(id: number, status: TaskStatus) : Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
