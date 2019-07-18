import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsIn } from 'class-validator';
import bcrypt from 'bcrypt';

import { User as UserT } from '../../../shared/types/user.interface';
import { Message } from './Message';

@Entity({ name: 'user' })
export class User implements UserT {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
    nullable: false,
  })
  @Length(4, 20)
  username!: string;

  @Column({
    nullable: false,
  })
  @Length(4, 100)
  password!: string;

  @Column({
    nullable: false,
    default: 'USER',
  })
  @IsIn(['ADMIN', 'USER'])
  role!: 'ADMIN' | 'USER';

  @Column({
    default:
      'https://laurauinteriordesign.com/wp-content/uploads/2018/03/avatar-placeholder.png',
  })
  avatarLink!: string;

  @OneToMany((type) => Message, (message) => message.username, {
    cascade: true,
  })
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkUnsafePassword(unsafePassword: string) {
    return bcrypt.compareSync(unsafePassword, this.password);
  }
}
