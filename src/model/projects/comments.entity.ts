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
import { Users } from "../user.entity";

@Entity()
export class Comments extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public content: string;

  @ManyToOne(() => Users, (users) => users.comments)
  users: Users;

  @ManyToOne(() => Cards, (cards) => cards.comments)
  cards: Cards;
}
