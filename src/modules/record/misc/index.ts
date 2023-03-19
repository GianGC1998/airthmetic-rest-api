import { throwError } from '../../../common/helpers';
import { Operation, Record } from '../../../common/entities';
import { OperationType, RecordStatus } from '../../../common/entities/enums';
import { RandomHelper } from '../../../common/helpers/random.helper';

export type CreateRecordBody = Record & {
  operationType: OperationType;
};

export type CreateRecordResponseDto = {
  record: Record;
  message: string;
};

export type DeleteRecordResponseDto = Record;

export const CreateRecordMessage = {
  [RecordStatus.ACCEPTED]: 'The operation was successfull',
  [RecordStatus.REJECTED]:
    'The operation was rejected. The user has no enough balance',
};

export async function getResponseFromOperation(
  record: Record,
  operation: Operation,
): Promise<string> {
  const variableLeft = Number(record.variableLeft);
  const variableRight = Number(record.variableRight);

  switch (operation.type) {
    case OperationType.ADDITION:
      return (variableLeft + variableRight).toFixed(4);
    case OperationType.SUBSTRACTION:
      return (variableLeft - variableRight).toFixed(4);
    case OperationType.MULTIPLICATION:
      return (variableLeft * variableRight).toFixed(4);
    case OperationType.DIVISION: {
      if (variableRight === 0)
        throwError('A division cannot be possible with zero divider');
      return (variableLeft / variableRight).toFixed(4);
    }
    case OperationType.SQUAREROOT: {
      if (variableLeft < 0)
        throwError('A square root cannot be possible with negative number');
      return Math.sqrt(variableLeft).toFixed(4);
    }
    case OperationType.RANDOMSTRING: {
      const response = await RandomHelper.getStringRandom();
      return response;
    }
    default:
      throwError('This is not a valid operation');
  }
}
