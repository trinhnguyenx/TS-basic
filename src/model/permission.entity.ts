import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Role } from './role.entity';
  
  @Entity('permissions')
  export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar')
    action: string;
  
    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
  }