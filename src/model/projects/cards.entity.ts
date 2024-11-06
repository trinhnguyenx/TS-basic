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
import { Lists } from "./lists.entity";
import { CardMembers } from "./cardMembers.entity";
import { Comments } from "./comments.entity";

@Entity()
export class Cards extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "int", default: 0 })
  public description: Int32;

  @Column({ type: "int", default: 0 })
  public position: Int32;

  @Column({ type: "varchar", length: 255, nullable: true })
  public coverUrl: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public priority: string;

  @Column({ type: "datetime", nullable: true })
  public startDate: Date;

  @Column({ type: "datetime", nullable: true })
  public dueDate: Date;

  @OneToMany(() => Comments, (comments) => comments.cards)
  comments: Comments[];

  @ManyToOne(() => CardMembers, (cardMembers) => cardMembers.cards)
  cardMembers: CardMembers;

  @ManyToOne(() => Lists, (lists) => lists.cards)
  public list: Lists;
}