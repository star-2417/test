import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 45 })
  account_name: string;

  @Column({ length: 45 })
  real_name: string;

  @Column({ length: 45 })
  password: string;

  @Column('int')
  role: number;

  @Column('int')
  user_status: number;
}
