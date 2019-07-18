import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  body!: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  likes!: number;

  @ManyToOne((type) => User, (user) => user.messages)
  @JoinColumn({ referencedColumnName: 'username', name: 'username' })
  username!: string;

  @CreateDateColumn()
  createdAt!: any;

  @UpdateDateColumn()
  updatedAt!: any;
}
