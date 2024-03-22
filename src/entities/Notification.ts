import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: "notification" })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, default: "" })
  title: string;

  @Column({ nullable: true, default: "" })
  content: string;

  @Column({ nullable: true, default: "" })
  url: string;

  @Column({ nullable: true, default: false })
  is_read: boolean;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  receivedAt: Date;
}
