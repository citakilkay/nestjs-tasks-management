import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('increment') // serialize increase value
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.Open,
    })
    status: TaskStatus;
}