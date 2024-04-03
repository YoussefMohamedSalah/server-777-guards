import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
} from "typeorm";

@Entity({ name: "partner" })
export class Partner extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({
        type: "jsonb",
        array: false,
        default: () => "'{}'",
        nullable: false,
    })
    logo: { name: string; url: string };

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
