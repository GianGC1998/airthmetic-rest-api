import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  startBalance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  currentBalance: number;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
