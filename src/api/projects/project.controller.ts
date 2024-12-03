import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { projectService } from "./project.service";
import {checkUserRole} from "../../services/checkUserRole.service";

import { RoleType } from "../../model/base/roleType.entity";
import { TrelloEntityType } from "../../model/base/trelloEntityType.entity";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse.service";
import { Profile, decoded } from "../user/user.interface";
import { Projects } from "../../model/projects/projects.entity";
import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse.service";


export const ProjectController = {
  async createProject(req: AuthenticatedRequest, res: Response) {
    try {
      const projectData = req.body;

      if (!req.user) {
        throw "Unauthorized";
      }
      const serviceResponse = await projectService.createProject(
        (req.user as decoded).userId,
        projectData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error update user profile: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async updateProject(req: AuthenticatedRequest, res: Response) {
    try {
      //type
      const projectData = req.body;
      const projectId = req.params.projectId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await projectService.updateProject(
        (req.user as decoded).userId,
        projectId,
        projectData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error update project data: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveProject(req: AuthenticatedRequest, res: Response) {
    try {
      const isArchive = true;
      const projectId = req.params.projectId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await projectService.archiveProject(
        (req.user as decoded).userId,
        projectId,
        isArchive
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archive project: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async addMemberToProject(req: AuthenticatedRequest, res: Response) {
    try {
      const memberId = req.body.userId;

      const projectId = req.params.projectId;
      //   console.log("memberId: ", memberId);
      //  console.log("projectId: ", projectId);

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const checkRole = await checkUserRole(
        TrelloEntityType.PROJECT,
        projectId,
        userId,
        RoleType.ADMIN
      );
      if (!checkRole) {
        throw "Unauthorized";
      }
      // console.log("finish checkRole at controller");

      const serviceResponse = await projectService.addMemberToProject(
        (req.user as decoded).userId,
        projectId,
        memberId
      );

      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error add member to project: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async deleteMemberFromProject(req: AuthenticatedRequest, res: Response) {
    try {
      const memberId = req.params.userId;

      const projectId = req.params.projectId;
      //   console.log("memberId: ", memberId);
      //  console.log("projectId: ", projectId);

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;
      // console.log("start checkRole at controller");
      const checkRole = await checkUserRole(
        TrelloEntityType.PROJECT,
        projectId,
        userId,
        RoleType.ADMIN
      );
      if (!checkRole) {
        throw "Unauthorized";
      }
      // console.log("finish checkRole at controller");

      const serviceResponse = await projectService.deleteMemberFromProject(
        (req.user as decoded).userId,
        projectId,
        memberId
      );

      // console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error delete member from project: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
};
