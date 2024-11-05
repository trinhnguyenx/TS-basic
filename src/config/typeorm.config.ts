import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

import { User } from "../model/users.entity";
import { Role } from "../model/roles.entity";
import { Permission } from "../model/permissions.entity";
config();
export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Role, Permission],
  migrationsTableName: "migrations",
  migrations: [join(__dirname, "../../src/migrations/**/*.ts")],
  synchronize: false,
});
