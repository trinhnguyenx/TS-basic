import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { Projects } from "../../model/projects/projects.entity";
import { projectRepository } from "./projectRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";

import cacheService from "../../services/cacheService";
// import { cache } from "../../services/cacheService";
import { generateJwt, verifyJwt } from "../../services/jwtService";
import { Login, Token, AuthenticatedRequest } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime";
import mailService from "../../services/sendEmail";


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
    userId: string, projectId: string,
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
};