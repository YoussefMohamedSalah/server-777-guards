import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Notification } from "./Notification";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    default: null,
  })
  name: string;

  @Column({
    default: null,
  })
  email: string;

  @Column({
    default: null,
  })
  password: string;

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
