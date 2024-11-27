import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { projectService } from "./project.service";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Profile, decoded } from "../user/user.interface";
import { Projects } from "../../model/projects/projects.entity";
import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse";

export const ProjectController = {
  async createProject(req: AuthenticatedRequest, res: Response) {
    try {
      const projectData = req.body;
      // const userId = req.body.userId;
      // console.log("userid:", req.body.userId);
      // console.log("req:", req.user);
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
};
