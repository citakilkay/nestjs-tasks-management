import { IsEnum } from "class-validator/types/decorator/typechecker/IsEnum";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatus {
    @IsEnum(TaskStatus) //  gelen değer verilen enum tipinde değilse exception fırlat
    status: TaskStatus;
    id: number;
}