/* tslint:disable:no-console */
import { DataSource, Repository } from 'typeorm';
import { Operation, User } from '../common/entities';

import { HashHelper } from '../common/helpers';
import { DatabaseConfig } from './database.config';
import { Operations } from './seeds/data';

async function seedUser(repository: Repository<User>, user: Partial<User>) {
  const item = await repository.findOne({ where: { username: user.username } });
  if (item) return;
  user.password = await HashHelper.hash(user.password);
  await repository.save(user);
}

export async function seedUsers(connection: DataSource) {
  console.log('+ Seeding User');

  await connection.transaction(async (manager) => {
    const repository = manager.getRepository(User);

    await seedUser(repository, {
      username: 'test',
      password: 'test',
      startBalance: 1000,
      currentBalance: 1000,
    });

    console.log('- Users done');
  });
}

async function seedOperation(
  repository: Repository<Operation>,
  operation: Partial<Operation>,
) {
  const item = await repository.findOne({ where: { id: operation.id } });
  if (item) return;

  await repository.save(operation);
}

export async function seedOperations(connection: DataSource) {
  console.log('+ Seeding Operations');

  await connection.transaction(async (manager) => {
    const repository = manager.getRepository(Operation);

    for (const operation of Operations) {
      await seedOperation(repository, operation);
    }

    console.log('- Users done');
  });
}

(async () => {
  const datasource = new DataSource({
    ...(DatabaseConfig.get as any),
  });
  await datasource.initialize();
  await seedUsers(datasource);
  await seedOperations(datasource);
})().then(() => {
  console.log('Seed finished');
  process.exit();
});
