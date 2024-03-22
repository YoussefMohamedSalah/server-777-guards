import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { Candidate } from "./Candidate";


@Entity({ name: "job" })
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    shift: string;

    @Column({ nullable: true })
    experience: string;

    @Column({ nullable: true })
    education: string;

    @Column({ nullable: true })
    skills: string;

    @Column({ nullable: true })
    salary: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true, default: 0 })
    duration: number;

    @Column({ nullable: true, default: 0 })
    count: number;
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @OneToMany(() => Candidate, (candidate) => candidate.job, { onDelete: "CASCADE" })
    candidates: Candidate[];
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}
