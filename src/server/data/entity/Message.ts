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
import { MessageType } from '../../../shared/types/message.interface';

@Entity()
export class Message implements MessageType {
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
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
