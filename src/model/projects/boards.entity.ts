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
import { Projects } from "./projects.entity";
import { Lists } from "./lists.entity";
import { BoardMembers } from "./boardMembers.entity";

@Entity()
export class Boards extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public coverUrl: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public assigned: string;

  @Column({ type: "boolean", default: false })
  public is_archive: boolean;

  @OneToMany(() => Lists, (lists) => lists.boardID)
  lists: Lists[];

  @ManyToOne(() => Projects, (projects) => projects.boards)
  projectID: Projects;

  @ManyToOne(() => BoardMembers, (boardMembers) => boardMembers.boardID)
  boardMembers: BoardMembers;
}
