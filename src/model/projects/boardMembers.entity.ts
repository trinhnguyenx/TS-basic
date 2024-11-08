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
import { Boards } from "./boards.entity";



@Entity()
export class BoardMembers extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @OneToMany(() => Users, (users) => users.boardMembers)
    userID: Users[];
  
    @OneToMany(() => Boards, (boards) => boards.boardMembers)
    boardID: Boards[];
  
}
