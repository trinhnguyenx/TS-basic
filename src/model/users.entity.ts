import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Int32,
} from "typeorm";
import { DateTimeEntity } from "./base/datetime.entity";
import { projectMembers } from "./projects/projectMembers.entity";
import { Comments } from "./projects/comments.entity";
import { Notifications } from "./projects/notifications.entity";
import { Roles } from "./roles.entity";
import { BoardMembers } from "./projects/boardMembers.entity";
import { CardMembers } from "./projects/cardMembers.entity";

@Entity()
export class Users extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  public password: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  public email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public bio: string;

  @Column({ type: "int", default: 0 })
  public isActivated: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  public avatarUrl: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public accessToken: string;

  @Column({ type: "datetime", nullable: true })
  public accessTokenExpiresAt: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  public resetToken: string;

  @Column({ type: "datetime", nullable: true })
  public resetTokenExpiresAt: Date;

  @OneToMany(() => projectMembers, (projectMembers) => projectMembers.user, {
    cascade: true,
  })
  projectMembers: projectMembers[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Notifications, (notifications) => notifications.user)
  notifications: Notifications[];

  @ManyToMany(() => Roles, (role) => role.users, {
    cascade: true,
  })
  @JoinTable()
  role: Roles[];

  @OneToMany(() => BoardMembers, (boardMembers) => boardMembers.user)
  boardMembers: BoardMembers[];

  @OneToMany(() => CardMembers, (cardMembers) => cardMembers.user)
  cardMembers: CardMembers[];
}
