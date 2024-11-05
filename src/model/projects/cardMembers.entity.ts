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
import { Cards } from "./cards.entity";
import { Projects } from "./projects.entity";
import { RoleType } from "../base/role.entity";

@Entity()
export class CardMembers extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.MEMBER })
  public role: RoleType;

  @OneToMany(() => Cards, (cards) => cards.cardMembers)
  public cards: Cards[];

  @ManyToOne(() => Projects, (projects) => projects.cardMembers)
  public projects: Projects;
}
