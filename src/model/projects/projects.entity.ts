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
import { projectMembers } from "./projectMembers.entity";
import { CardMembers } from "./cardMembers.entity";
import { Boards } from "./boards.entity";

@Entity()
export class Projects extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "varchar", length: 255 })
  public description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public assigned: string;

  @Column({ type: "boolean", default: false })
  public is_archive: boolean;

  @OneToMany(() => projectMembers, (projectMembers) => projectMembers.projectID)
  projectMembers: projectMembers[];

  @OneToMany(() => Boards, (boards) => boards.projectID)
  boards: Boards[];
}
