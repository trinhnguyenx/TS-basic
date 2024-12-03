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
import { Users } from "../users.entity";
import { Projects } from "./projects.entity";
import { RoleType } from "../base/roleType.entity";

@Entity()
export class ProjectMembers extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.MEMBER })
  public role: RoleType;

  @ManyToOne(() => Users, (users) => users.projectMembers)
  user: Users;

  @ManyToOne(() => Projects, (projects) => projects.projectMembers)
  project: Projects;
}
