import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { RoleType } from "../../model/base/roleType.entity";
import { Projects } from "../../model/projects/projects.entity";
import { ProjectMembers } from "../../model/projects/projectMembers.entity";
import { projectRepository } from "./projectRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";

import cacheService from "../../services/cache.service";
// import { cache } from "../../services/cacheService";
import { generateJwt, verifyJwt } from "../../services/jwt.service";
import { Login, Token, AuthenticatedRequest } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime.service";
import mailService from "../../services/sendEmail.service";

export const projectService = {
  async createProject(
    userId: string,
    projectData: Projects
  ): Promise<ServiceResponse<Projects | null>> {
    try {
      console.log("projectData:", projectData);
      console.log("userid: ", userId);

      const project = await projectRepository.createProjectAsync(
        userId,
        projectData
      );
      console.log("finish create project at service ");
      return new ServiceResponse<Projects>(
        ResponseStatus.Success,
        "Project created successfully",
        project,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating project: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async updateProject(
    userId: string,
    projectId: string,
    projectData: Projects
  ): Promise<ServiceResponse<Projects | null>> {
    try {
      console.log("projectData:", projectData);
      console.log("userId: ", userId);

      const updatedProject = await projectRepository.updateProjectAsync(
        projectId,
        projectData
      );

      console.log("finish update project at service ");
      if (!updatedProject) {
        throw new Error("Project not found");
      }
      return new ServiceResponse<Projects>(
        ResponseStatus.Success,
        "Project updated successfully",
        updatedProject,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating project: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async archiveProject(
    userId: string,
    projectId: string,
    archive: boolean
  ): Promise<ServiceResponse<Projects | null>> {
    try {
      const projectData = { is_archive: archive };
      console.log("projectData:", projectData);
      console.log("userId: ", userId);

      const updatedProject = await projectRepository.updateProjectAsync(
        projectId,
        projectData
      );

      console.log("finish archive project at service ");
      if (!updatedProject) {
        throw new Error("Project not found");
      }
      return new ServiceResponse<Projects>(
        ResponseStatus.Success,
        "Project archived successfully",
        updatedProject,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error archiving project: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async addMemberToProject(
    userId: string,
    projectId: string,
    memberId: string
  ): Promise<ServiceResponse<ProjectMembers | null>> {
    try {
      console.log("memberId:", memberId);
      console.log("userId: ", userId);

      const projectMember = await projectRepository.getProjectMemberAsync(
        memberId,
        projectId
      );
      if (projectMember) {
        throw new Error("Member already exists in project");
      }
      const addedMember = await projectRepository.addProjectMemberAsync(
        memberId,
        projectId,
        RoleType.MEMBER
      );

      if (!addedMember) {
        throw new Error("Can't add member to project");
      }
      console.log("finish add member to project at service ");
      return new ServiceResponse<ProjectMembers>(
        ResponseStatus.Success,
        "Add member to project successfully",
        addedMember,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error add member to project: ${
        (ex as Error).message
      }`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async deleteMemberFromProject(
    userId: string,
    projectId: string,
    memberId: string
  ): Promise<ServiceResponse<ProjectMembers | null>> {
    try {
      // console.log("memberId:", memberId);
      // console.log("userId: ", userId);

      const projectMember = await projectRepository.getProjectMemberAsync(
        memberId,
        projectId
      );
      if (!projectMember) {
        throw new Error("Member not exists in project");
      }
      // console.log("start delete member from project at service ");
      const deletedMember = await projectRepository.deleteProjectMemberAsync(
        memberId,
        projectId
      );

      if (!deletedMember) {
        throw new Error("Can't delete member from project");
      }
      // console.log("finish delete member from project at service ");
      return new ServiceResponse<ProjectMembers>(
        ResponseStatus.Success,
        "Delete member from project successfully",
        projectMember,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error add member to project: ${
        (ex as Error).message
      }`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
