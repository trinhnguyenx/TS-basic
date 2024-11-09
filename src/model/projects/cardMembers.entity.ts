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
import { Users } from "../users.entity";
import { RoleType } from "../base/roleType.entity";

@Entity()
export class CardMembers extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.MEMBER })
  public role: RoleType;

  @ManyToOne(() => Cards, (cards) => cards.cardMembers)
  public cardID: Cards;

  @ManyToOne(() => Users, (users) => users.cardMembers)
  public userID: Users;
}
