import { DataSource } from "typeorm";
import { Roles } from "../model/roles.entity";
import { Permissions } from "../model/permissions.entity";
import { Users } from "../model/users.entity";

export async function seedData(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Roles);
  const permissionRepository = dataSource.getRepository(Permissions);

  const existingRoles = await roleRepository.count();
  if (existingRoles > 0) {
    console.log("Seed data already exists, skipping seeding.");
    return;
  }

  const permissions = [
    { action: "read" },
    { action: "write" },
    { action: "delete" },
    { action: "*" },
  ];

  const createdPermissions = await permissionRepository.save(permissions);

  const roles = [
    { name: "user", permissions: [createdPermissions[0]] },
    { name: "admin", permissions: [createdPermissions[3]] },
  ];

  await roleRepository.save(roles);

  const users = [
    {
      name: "user1",
      password: "password1",
      email: "email01@gmail.com",
      bio: "this is bio of user 01",
      roles: [roles[0]],
    },
    {
      name: "user2",
      password: "password2",
      email: "email02@gmail.com",
      bio: "this is bio of user 02",
      roles: [roles[0]],
    },
  ];

  const admins = [
    {
      name: "admin1",
      password: "password1",
      email: "email01@gmail.com",
      bio: "this is bio of admin 01",
      roles: [roles[1]],
    },
    {
      name: "admin2",
      password: "password2",
      email: "email02@gmail.com",
      bio: "this is bio of admin 02",
      roles: [roles[1]],
    },
  ];

  await dataSource.getRepository(Users).save(users);
  await dataSource.getRepository(Users).save(admins);

  console.log("Seed data inserted successfully");
}
