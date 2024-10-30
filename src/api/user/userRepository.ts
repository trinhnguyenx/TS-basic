import { User } from "../../model/user.entity";
import { Role } from "@/model/role.entity";
import { Permission } from "@/model/permission.entity";
import dataSource from "../../config/typeorm.config";

export const userRepository = dataSource.getRepository(User).extend({
  async findAllAsync(): Promise<User[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<User | null> {
    return this.findOneBy({ id: id });
  },

  async createUserAsync(userData: Partial<User>): Promise<User> {
    const roleRepository = dataSource.getRepository(Role);
    const userRole = await roleRepository.findOneBy({ name: "user" });
    if (!userRole) {
      throw new Error("Role 'user' not found");
    }
    const newUser = this.create({
      ...userData,
      roles: [userRole],
    });
    return this.save(newUser);
  },

  async updateUserAsync(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    await this.update(id, updateData);
    return this.findOneBy({ id });
  },

  async updateUserRoleAsync(
    userId: string,
    roleName: string
  ): Promise<User | null> {
    const user = await this.findOne({
      where: { id: userId },
      relations: ["roles"],
    });
    if (!user) {
      throw new Error("User not found");
    }
    const roleRepository = dataSource.getRepository(Role);
    const role = await roleRepository.findOneBy({ name: roleName });
    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }
    user.roles = [role];
    return this.save(user);
  },

  async findByEmailAsync(email: string | undefined): Promise<User | null> {
    return this.findOneBy({ email });
  },
  async findByIdWithRolesAndPermissions(userId: string): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["roles", "roles.permissions"],
    });
  },
});
