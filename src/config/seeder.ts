import { DataSource } from "typeorm";
import { Roles } from "../model/roles.entity";
import { Permissions } from "../model/permissions.entity";

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
  console.log("Seed data inserted successfully");
}
