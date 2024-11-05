import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./roles.entity";

@Entity("permissions")
export class Permissions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  action: string;

  @ManyToMany(() => Roles, (role) => role.permissions)
  roles: Roles[];
}
