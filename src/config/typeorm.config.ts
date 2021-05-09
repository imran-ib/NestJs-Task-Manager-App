/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'imran',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
