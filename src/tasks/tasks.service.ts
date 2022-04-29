import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTaskById(id: number) : Task {
        return this.tasks.find(i => i.id == id);
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
