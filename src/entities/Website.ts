import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
} from "typeorm";

@Entity({ name: "website" })
export class Website extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    identifier: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    land_line: string;

    @Column({ nullable: true })
    phone_number_1: string;

    @Column({ nullable: true })
    phone_number_2: string;

    @Column({ nullable: true })
    ar_address: string;

    @Column({ nullable: true })
    en_address: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    instagram: string;

    @Column({ nullable: true })
    linkedin: string;

    @Column({ nullable: true })
    logo: string;

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
