import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DateTimeEntity } from './base/dateTimeEntity';

@Entity('users')
export class User extends DateTimeEntity {
  @PrimaryGeneratedColumn()
    public id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    public password: string;  

    @Column({ type: 'varchar', unique: true, length: 255 })
    public email: string;
}
