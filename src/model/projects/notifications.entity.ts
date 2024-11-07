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
import { MessageType } from "../base/messageType.entity";
@Entity()
export class Notifications extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public message: string;

  @Column({ type: "enum", enum: MessageType, default: MessageType.TEXT })
  public type: MessageType;

  @Column({ type: "json", nullable: true })
  public data: any;

  @Column({ type: "boolean", default: false })
  public isRead: boolean;

  @ManyToOne(() => Users, (users) => users.notifications, { cascade: true })
  userID: Users;
}
