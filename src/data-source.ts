import "reflect-metadata";
import { DataSource } from "typeorm";
import { Measure } from "./models/Measure";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'mydatabase',
  synchronize: false,
  logging: false,
  entities: [Measure],
  migrations: ['src/migration/*.ts'],
}
);
