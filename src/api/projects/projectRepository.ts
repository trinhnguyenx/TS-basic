import { Projects } from "../../model/projects/projects.entity";
import {Users} from "../../model/users.entity"
import { projectMembers } from "../../model/projects/projectMembers.entity";
import { RoleType } from "../../model/base/roleType.entity";

import dataSource from "../../config/typeorm.config";

export const projectRepository = dataSource.getRepository(Projects).extend({
  async findAllAsync(): Promise<Projects[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Projects | null> {
    return this.findOneBy({ id: id });
  },

  async createProjectAsync(
    userId: string,
    projectData: Partial<Projects>
  ): Promise<Projects> {
    // const newProject = this.create({
    // ...projectData,
    // });
    // return this.save(newProject);
    return await dataSource.transaction(async (manager) => {
      const project = await manager.create(Projects, projectData);
      // console.log("finish create project at repo");
      const savedProject = await manager.save(project);

      // console.log("finish save project at repo");
       const user = await manager.findOne(Users, { where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }
       const projectMember = manager.create(projectMembers, {
        role: RoleType.ADMIN, // Set the role for the creator
        user: user, // Only set the ID reference
        project: savedProject, // typeORM will auto extract id from savedProject, or can use { id: savedProject.id }
      });
      // console.log("finish create projectMember at repo");
      const savedProjectMember= await manager.save(projectMember);
      // console.log("finish save projectMember at repo: ", savedProjectMember);
      return savedProject;
    });
  },

  async updateProjectAsync(
    id: string,
    updateData: Partial<Projects>
  ): Promise<Projects | null> {
    const updatedProject = await this.update(id, updateData);
    
      return this.findOneBy({ id: id });
    
    // return this.findOneBy({ id });
  },

  async deleteProjectAsync(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  },
});
