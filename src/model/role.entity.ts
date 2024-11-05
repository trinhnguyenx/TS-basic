import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './user.entity';
import { Permissions } from './permission.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @ManyToMany(() => Users, (user) => user.role)
  users: Users[];

  @ManyToMany(() => Permissions, (permission) => permission.roles, { cascade: true })
  @JoinTable()
  permissions: Permissions[];
}
