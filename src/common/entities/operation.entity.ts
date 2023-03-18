import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '.';
import { OperationType } from './enums';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OperationType,
  })
  type: OperationType;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cost: number;

  @OneToMany(() => Record, (record) => record.operation)
  records: Record[];
}
