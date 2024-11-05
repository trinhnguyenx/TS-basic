import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Int32,
  ManyToMany,
} from "typeorm";
import { DateTimeEntity } from "../base/datetime.entity";
import { Users } from "../user.entity";
import { Projects } from "./projects.entity";
import { RoleType } from "../base/role.entity";

@Entity()
export class projectMembers extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.MEMBER })
  public role: RoleType;

  @ManyToMany(() => Users, (users) => users.projects)
  users: Users[];

  @OneToMany(() => Projects, (projects) => projects.projectMembers)
  projects: Projects[];
}
