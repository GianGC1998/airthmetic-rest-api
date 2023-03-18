import { OperationType } from '../../common/entities/enums';
import { Operation } from '../../common/entities';

export const Operations: Partial<Operation>[] = [
  {
    id: 1,
    type: OperationType.ADDITION,
    cost: 10,
  },
  {
    id: 2,
    type: OperationType.SUBSTRACTION,
    cost: 10,
  },
  {
    id: 3,
    type: OperationType.MULTIPLICATION,
    cost: 10,
  },
  {
    id: 4,
    type: OperationType.DIVISION,
    cost: 15,
  },
  {
    id: 5,
    type: OperationType.SQUAREROOT,
    cost: 15,
  },
  {
    id: 6,
    type: OperationType.RANDOMSTRING,
    cost: 20,
  },
];
