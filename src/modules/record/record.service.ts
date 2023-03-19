import { Injectable } from '@nestjs/common';
import { RecordStatus } from '../../common/entities/enums';
import { DataSource } from 'typeorm';
import { FindAllQueryDto } from '../../common/dto';
import { Operation, Record, User } from '../../common/entities';
import {
  CodeHelper,
  PaginationHelper,
  TransactionHelper,
  throwError,
  throwException,
} from '../../common/helpers';
import {
  CreateRecordBody,
  CreateRecordMessage,
  CreateRecordResponseDto,
  DeleteRecordResponseDto,
  getResponseFromOperation,
} from './misc';
import { RecordRepository } from './record.repository';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly connection: DataSource,
  ) {}

  async findAll(userSession: User, body: FindAllQueryDto) {
    try {
      const pagination = PaginationHelper.getSkipAndTake(
        body.page,
        body.pageSize,
      );

      if (!body.filter) body.filter = '';

      body.isActive = CodeHelper.getActiveFromQuery(body.active);

      const selectResult = await this.recordRepository.findRecords(
        userSession,
        pagination.skip,
        pagination.take,
        body,
      );

      const result = PaginationHelper.getPaginatedResult<Record>(
        selectResult[0],
        selectResult[1],
        pagination.take,
      );
      return result;
    } catch (error) {
      throwException(
        __filename,
        'findAll',
        error,
        'An error occurred at retrieving the records. Please, contact to support',
      );
    }
  }

  async findById(id: number) {
    try {
      const record = await this.recordRepository.findOne({ where: { id } });
      if (!record) {
        throwError('The record does not exists.');
      }
      return record;
    } catch (error) {
      throwException(
        __filename,
        'findById',
        error,
        'An error occured at retrieving the record information. Please, contact to support',
      );
    }
  }

  async create(
    userSession: User,
    record: CreateRecordBody,
  ): Promise<CreateRecordResponseDto> {
    const queryRunner = await TransactionHelper.startTransaction(
      this.connection,
    );
    const recordRepository = queryRunner.manager.getRepository(Record);
    const userRepository = queryRunner.manager.getRepository(User);
    const operationRepository = queryRunner.manager.getRepository(Operation);

    try {
      const recordToSave = { ...record };
      const currentUser = await userRepository.findOne({
        where: { id: userSession.id },
      });

      const currentOperation = await operationRepository.findOne({
        where: { type: record.operationType },
      });

      recordToSave.amount = currentOperation.cost;
      recordToSave.userBalanceBefore = currentUser.currentBalance;
      recordToSave.userBalanceAfter = currentUser.currentBalance;
      recordToSave.status = RecordStatus.ACCEPTED;
      recordToSave.creationDate = new Date();
      recordToSave.response = '';
      recordToSave.user = userSession;
      recordToSave.operation = currentOperation;

      if (Number(currentUser.currentBalance) < Number(currentOperation.cost)) {
        recordToSave.status = RecordStatus.REJECTED;
      } else {
        recordToSave.response = await getResponseFromOperation(
          record,
          currentOperation,
        );

        const newUserBalance =
          Number(currentUser.currentBalance) - Number(currentOperation.cost);

        recordToSave.userBalanceAfter = newUserBalance;

        await userRepository.update(
          {
            id: currentUser.id,
          },
          { currentBalance: newUserBalance },
        );
      }

      const savedRecord = await recordRepository.save(recordToSave);

      await queryRunner.commitTransaction();

      return {
        record: savedRecord,
        message: CreateRecordMessage[recordToSave.status],
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throwException(
        __filename,
        'create',
        error,
        'An error occurred while performing the operation. Please, contact to support',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async delete(recordId: number): Promise<DeleteRecordResponseDto> {
    const queryRunner = await TransactionHelper.startTransaction(
      this.connection,
    );
    const recordRepository = queryRunner.manager.getRepository(Record);

    try {
      const prevRecord = await recordRepository.findOne({
        where: { id: recordId },
      });

      if (!prevRecord) {
        throwError('The record does not exists');
      }
      if (!prevRecord.active) {
        throwError('The record was deleted previously');
      }

      await recordRepository.update({ id: prevRecord.id }, { active: false });

      await queryRunner.commitTransaction();

      return prevRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throwException(
        __filename,
        'delete',
        error,
        'An error occurred while deleting the record. Please, contact to support',
      );
    } finally {
      await queryRunner.release();
    }
  }
}
