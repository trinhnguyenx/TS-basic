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

  @ManyToOne(() => Users, (users) => users.boardMembers)
    user: Users;
  
    @ManyToOne(() => Boards, (boards) => boards.boardMembers)
    board: Boards;
  
}
