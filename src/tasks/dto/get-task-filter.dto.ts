import { IsEnum } from "class-validator";
import { IsOptional } from "class-validator/types/decorator/common/IsOptional";
import { TaskStatus } from "../task-status.enum";

export class GetTaskFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    
    @IsOptional()
    search?: string;
}