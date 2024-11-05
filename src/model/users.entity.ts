import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  Int32,
} from "typeorm";
import { DateTimeEntity } from "./base/datetime.entity";
import { projectMembers } from "./projects/projectMembers.entity";
import { Comments } from "./projects/comments.entity";
import { Notifications } from "./projects/notifications.entity";
import { Roles } from "./roles.entity";

@Entity()
export class Users extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  public password: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  public email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public bio: string;

  @Column({ type: "int", default: 0 })
  public isActivated: Int32;

  @Column({ type: "varchar", length: 255, nullable: true })
  public avatarUrl: string;

  @ManyToMany(() => projectMembers, (projectMembers) => projectMembers.users)
  projects: projectMembers[];

  @OneToMany(() => Comments, (comments) => comments.users)
  comments: Comments[];

  @OneToMany(() => Notifications, (notifications) => notifications.users)
  notifications: Notifications[];

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;
}
