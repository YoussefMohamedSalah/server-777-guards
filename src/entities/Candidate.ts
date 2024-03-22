import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { Job } from "./Job";


@Entity({ name: "candidate" })
export class Candidate extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({
        type: "date",
        default: () => "CURRENT_TIMESTAMP",
    })
    birthday: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    resource: string;

    @Column({
        type: "date",
        default: () => "CURRENT_TIMESTAMP",
    })
    date: string;

    @Column({ nullable: true })
    start_date: string;

    @Column({ nullable: true })
    file: string;
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @ManyToOne(() => Job, (job) => job.candidates, { onDelete: "CASCADE" })
    job: Job;
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
