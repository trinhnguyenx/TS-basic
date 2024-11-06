import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

import { Users } from "../model/users.entity";
import { Roles } from "../model/roles.entity";
import { Permissions } from "../model/permissions.entity";
config();
export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Roles, Permissions],
  migrationsTableName: "migrations",
  migrations: [join(__dirname, "../../src/migrations/**/*.ts")],
  synchronize: false,
});
