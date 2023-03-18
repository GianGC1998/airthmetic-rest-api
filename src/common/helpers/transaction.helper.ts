import { DataSource } from 'typeorm';

async function startTransaction(connection: DataSource) {
  const queryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction('SERIALIZABLE');

  return queryRunner;
}

export const TransactionHelper = {
  startTransaction,
};
