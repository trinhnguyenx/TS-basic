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
import { Boards } from "./boards.entity";
import { Cards } from "./cards.entity";

@Entity()
export class Lists extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "int", default: 0 })
  public position: Int32;

  @Column({ type: "boolean", default: false })
  public is_archive: boolean;

  @OneToMany(() => Cards, (cards) => cards.listID)
  public cards: Cards[];

  @ManyToOne(() => Boards, (boards) => boards.lists)
  public boardID: Boards;
}
