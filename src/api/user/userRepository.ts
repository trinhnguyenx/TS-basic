import { Users } from "../../model/users.entity";
import { Roles } from "@/model/roles.entity";
import { Permissions } from "@/model/permissions.entity";
import dataSource from "../../config/typeorm.config";

export const userRepository = dataSource.getRepository(Users).extend({
  async findAllAsync(): Promise<Users[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Users | null> {
    return this.findOneBy({ id: id });
  },

  async createUserAsync(userData: Partial<Users>): Promise<Users> {
    const roleRepository = dataSource.getRepository(Roles);
    const userRole = await roleRepository.findOneBy({ name: "user" });
    if (!userRole) {
      throw new Error("Roles 'user' not found");
    }
    const newUser = this.create({
      ...userData,
      role: [userRole,]
    });
    return this.save(newUser);
  },

  async updateUserAsync(
    id: string,
    updateData: Partial<Users>
  ): Promise<Users | null> {
    await this.update(id, updateData);
    return this.findOneBy({ id });
  },

  async updateUserRoleAsync(
    userId: string,
    roleName: string
  ): Promise<Users | null> {
    const user = await this.findOne({
      where: { id: userId },
      relations: ["roles"],
    });
    if (!user) {
      throw new Error("Users not found");
    }
    const roleRepository = dataSource.getRepository(Roles);
    const role = await roleRepository.findOneBy({ name: roleName });
    if (!role) {
      throw new Error(`Roles '${roleName}' not found`);
    }
    user.role = [role];
    return this.save(user);
  },

  async findByEmailAsync(email: string | undefined): Promise<Users | null> {
    return this.findOneBy({ email });
  },
  async findByIdWithRolesAndPermissions(userId: string): Promise<Users | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["roles", "roles.permissions"],
    });
  },
});
