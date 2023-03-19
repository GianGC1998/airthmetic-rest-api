import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecordStatus } from './enums';
import { Operation, User } from '.';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  userBalanceBefore: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  userBalanceAfter: number;

  @Column({
    type: 'enum',
    enum: RecordStatus,
  })
  status: RecordStatus;

  @Column()
  creationDate: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: null,
    nullable: true,
  })
  variableLeft: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: null,
    nullable: true,
  })
  variableRight: number;

  @Column()
  response: string;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @ManyToOne(() => Operation, (user) => user.records)
  operation: Operation;
}
