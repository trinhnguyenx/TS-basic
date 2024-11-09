import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

import { Users } from "../model/users.entity";
import { Roles } from "../model/roles.entity";
import { Permissions } from "../model/permissions.entity";
import { Boards } from "../model/projects/boards.entity";
import { BoardMembers } from "../model/projects/boardMembers.entity";
import { CardMembers } from "../model/projects/cardMembers.entity";
import { Cards } from "../model/projects/cards.entity";
import { Comments } from "../model/projects/comments.entity";
import { Lists } from "../model/projects/lists.entity";
import { Notifications } from "../model/projects/notifications.entity";
import { projectMembers } from "../model/projects/projectMembers.entity";
import { Projects } from "../model/projects/projects.entity";


config();
export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Roles, Permissions, Boards,BoardMembers, CardMembers, Cards, Comments, Lists, Notifications, projectMembers, Projects],
  migrationsTableName: "migrations",
  migrations: [join(__dirname, "../../src/migrations/**/*.ts")],
  synchronize: false,
});
